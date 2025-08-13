from rest_framework import generics, filters, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend

from .models import Author, Genre, Book, Rating, Favorite
from .serializers import (
    AuthorSerializer, GenreSerializer, BookSerializer,
    RatingSerializer, FavoriteSerializer
)
from .permissions import IsOwnerOrReadOnly

# Logout endpoint for JWT (blacklist refresh tokens)
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data['refresh']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)

# Author Views
class AuthorListCreateView(generics.ListCreateAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    permission_classes = [IsAuthenticated]

class AuthorDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    permission_classes = [IsAuthenticated]

# Genre Views
class GenreListCreateView(generics.ListCreateAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = [IsAuthenticated]

class GenreDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = [IsAuthenticated]

# Book List/Create with filtering, searching, pagination
class BookListCreateView(generics.ListCreateAPIView):
    queryset = Book.objects.select_related('author', 'genre', 'user').all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['author', 'genre', 'publish_year']
    search_fields = ['title', 'author__name']

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Book Detail (Retrieve/Update/Delete) with owner permission
class BookRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.select_related('author', 'genre', 'user').all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

# Ratings List/Create (filter by book_id optional)
class RatingListCreateView(generics.ListCreateAPIView):
    serializer_class = RatingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        book_id = self.request.query_params.get('book_id')
        if book_id:
            return Rating.objects.filter(book_id=book_id)
        return Rating.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Rating Detail (Retrieve/Update/Delete) with owner permission
class RatingDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

# Favorites List/Create (user favorites only)
class FavoriteListCreateView(generics.ListCreateAPIView):
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Favorite Delete by book_id
class FavoriteDeleteView(generics.DestroyAPIView):
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        book_id = self.kwargs['book_id']
        favorite = get_object_or_404(Favorite, user=self.request.user, book_id=book_id)
        return favorite
