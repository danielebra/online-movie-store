from rest_framework import serializers

from .models import User, Movie, MovieReview, Genre, MovieGenre, Review, MovieOrder, Order

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


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'


class MovieSerializer(serializers.ModelSerializer):
    genre = serializers.SerializerMethodField()
    reviews = serializers.SerializerMethodField()

    class Meta:
        model = Movie
        fields = '__all__'

    def get_genre(self, obj):
        return [_genre for _genre in obj.genre.all().values()]

    def get_reviews(self, obj):
        return [_review for _review in obj.reviews.all().values()]


class MovieGenreSerializer(serializers.ModelSerializer):

    class Meta:
        model = MovieGenre
        fields = '__all__'


class PasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['password', ]


class MovieOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieOrder
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
