from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth import authenticate, login
from django.views.generic import View
from django.contrib.auth.models import User as UserAuthModel

from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status, viewsets

from .models import Movie, Genre, MovieGenre, Review, MovieReview, Order, LogModel
from .models import User as UserModel
from .serializers import UsersSerializer, MovieSerializer, GenreSerializer, PasswordSerializer, MovieGenreSerializer, LoginSerializer, MovieReviewSerializer, ReviewSerializer, OrderSerializer, LogSerializer
from .forms import UserForm


class Genre(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer


class ReviewView(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class MovieGenreView(viewsets.ModelViewSet):
    queryset = MovieGenre.objects.all()
    serializer_class = MovieGenreSerializer


class User(viewsets.ModelViewSet):
    queryset = UserModel.objects.all()
    serializer_class = UsersSerializer

    @action(methods=['get', 'post'], detail=True)
    def change_password(self, request, pk=None):
        user = self.get_object()
        serializer = PasswordSerializer(data=request.data)
        if serializer.is_valid():
            # set_password(serializer.data['password']) This requires use of the User auth model
            user.password = serializer.data['password']
            user.save()
            return Response({"status": 'password changed'})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['patch'], detail=True)
    def change(self, request, pk=None):
        user = self.get_object()
        serializer = UsersSerializer(
            instance=user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            userObj = UserModel.objects.filter(
                email=request.data['email']).values().first()
            return Response({"status": "user updated", "user": userObj}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['post'], detail=True)
    def login(self, request, pk=None):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid()

        error = serializer.errors
        can_bypass_validation = False

        if 'email' in error.keys() and len(error.keys()) == 1:
            if len(error['email']) == 1:  # Only when there is one error
                if error['email'][0].code == "unique":
                    can_bypass_validation = True

        if can_bypass_validation or serializer.is_valid():
            user = UserModel.objects.filter(
                email=request.data['email']).values().first()
            if not user:
                return Response({'email': 'Email not found'})
            if user['password'] == request.data['password']:
                return Response({"user": user})
            else:
                return Response({'email': 'Email or password dont match.'})

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['delete'], detail=True)
    def delete(self, request, pk=None):
        user = self.get_object()
        user.delete()
        return Response(status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True)
    def log(self, request, pk=None):
        print("in post")
        # Map the pk to user
        data = request.data.copy()
        data['user'] = pk
        serializer = LogSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['get'], detail=True)
    def logs(self, request, pk=None):
        query = LogModel.objects.filter(user=pk).values()
        print(query)
        return Response(query, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True)
    def orders(self, request, pk=None):
        query = Order.objects.filter(user=pk).values()
        return Response(query, status=status.HTTP_200_OK)


class MoviePopulator(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

    def post(self, request):
        # This doesn't handle genres
        query = Movie.objects.all()
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Used for linking a genre to movie (done via primary keys)
    @action(methods=['post'], detail=True)
    def add_genre(self, request, pk=None):
        query = MovieGenre.objects.all()

        request_data = request.data.copy()
        if 'movie' not in request_data.keys():
            request_data['movie'] = pk
        serializer = MovieGenreSerializer(data=request_data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['post'], detail=True)
    def add_review(self, request, pk=None):
        query = MovieReview.objects.all()

        # Remap pk to movie_pk
        request_data = request.data.copy()
        if 'movie' not in request_data.keys():
            request_data['movie'] = pk
        serializer = MovieReviewSerializer(data=request_data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['delete'], detail=True)
    def delete(self, request, pk=None):
        movie = self.get_object()
        movie.delete()
        return Response(status=status.HTTP_200_OK)

    @action(methods=['patch'], detail=True)
    def change(self, request, pk=None):
        movie = self.get_object()
        serializer = MovieSerializer(
            instance=movie, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": 'movie updated'})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['get'], detail=True)
    def genres(self, request, pk=None):
        genres = MovieGenre.objects.all().filter(movie=pk).values()
        if not genres:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(genres, status=status.HTTP_200_OK)


class LogView(viewsets.ModelViewSet):
    queryset = LogModel.objects.all()
    serializer_class = LogSerializer


class OrderView(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    @action(methods=['patch'], detail=True)
    def change(self, request, pk=None):
        order = self.get_object()
        serializer = OrderSerializer(
            instance=order, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": 'order updated'})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
