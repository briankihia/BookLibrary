from rest_framework import serializers
from .models import Author, Genre, Book, Rating, Favorite
from django.contrib.auth.models import User

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'full_name', 'email')

    def get_full_name(self, obj):
        return obj.get_full_name()  # returns first_name + last_name


class BookSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    author = AuthorSerializer(read_only=True)
    genre = GenreSerializer(read_only=True)
    author_id = serializers.PrimaryKeyRelatedField(queryset=Author.objects.all(), source='author', write_only=True)
    genre_id = serializers.PrimaryKeyRelatedField(queryset=Genre.objects.all(), source='genre', write_only=True)

    class Meta:
        model = Book
        fields = ['id', 'title', 'isbn', 'publish_year', 'description',
                  'author', 'genre', 'author_id', 'genre_id', 'user',
                  'created_at', 'updated_at']

    def validate_publish_year(self, value):
        import datetime
        current_year = datetime.datetime.now().year
        if value > current_year or value < 0:
            raise serializers.ValidationError("Enter a valid publication year.")
        return value

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class RatingSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    book = serializers.PrimaryKeyRelatedField(queryset=Book.objects.all())

    class Meta:
        model = Rating
        fields = ['id', 'rating', 'review', 'user', 'book', 'created_at', 'updated_at']

    def validate_rating(self, value):
        if not (1 <= value <= 5):
            raise serializers.ValidationError("Rating must be between 1 and 5.")
        return value

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class FavoriteSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    book = serializers.PrimaryKeyRelatedField(queryset=Book.objects.all())

    class Meta:
        model = Favorite
        fields = ['id', 'user', 'book', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
