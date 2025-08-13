from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import (
    LogoutView,
    AuthorListCreateView, AuthorDetailView,
    GenreListCreateView, GenreDetailView,
    BookListCreateView, BookRetrieveUpdateDestroyView,
    RatingListCreateView, RatingDetailView,
    FavoriteListCreateView, FavoriteDeleteView,
)

urlpatterns = [
    # JWT Token Auth handled by accounts app? If not, here is standard:
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # get JWT token pair
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('logout/', LogoutView.as_view(), name='logout'),

    # Authors
    path('authors/', AuthorListCreateView.as_view(), name='author-list-create'),
    path('authors/<int:pk>/', AuthorDetailView.as_view(), name='author-detail'),

    # Genres
    path('genres/', GenreListCreateView.as_view(), name='genre-list-create'),
    path('genres/<int:pk>/', GenreDetailView.as_view(), name='genre-detail'),

    # Books
    path('books/', BookListCreateView.as_view(), name='book-list-create'),
    path('books/<int:pk>/', BookRetrieveUpdateDestroyView.as_view(), name='book-detail'),

    # Ratings
    path('ratings/', RatingListCreateView.as_view(), name='rating-list-create'),
    path('ratings/<int:pk>/', RatingDetailView.as_view(), name='rating-detail'),

    # Favorites
    path('favorites/', FavoriteListCreateView.as_view(), name='favorite-list-create'),
    path('favorites/<int:book_id>/', FavoriteDeleteView.as_view(), name='favorite-delete'),
]
