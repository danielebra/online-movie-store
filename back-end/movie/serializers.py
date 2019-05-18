from rest_framework import serializers

from .models import User, Movie, MovieReview, Genre, MovieGenre, Review

# convert models to json, each seralise has a model and fields to display


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class MovieReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieReview
        fields = '__all__'  # ( 'reviews',)#'__all__'


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password']


class MovieSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = '__all__'


class MovieGenreSerializer(serializers.ModelSerializer):

    class Meta:
        model = MovieGenre
        fields = '__all__'


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'


class PasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['password', ]
