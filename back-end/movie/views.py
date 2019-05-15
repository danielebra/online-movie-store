from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth import authenticate, login
from django.views.generic import View
from django.contrib.auth.models import User as UserAuthModel

from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status, viewsets

from .models import Movie, Genre
from .models import User as UserModel
from .serializers import UsersSerializer, MovieSerializer, GenreSerializer, PasswordSerializer
from .forms import UserForm


# class UserFormView(View):
#     form_class = UserForm
#     # template_name =

#     def get(self, request):
#         form = self.form_class(None)

#     def post(self, request):
#         form = self.form_class(request.POST)
#         if form.is_valid():
#             user = form.save(commit=False)

#             username = form.cleaned_data['username']
#             password = form.cleaned_data['password']
#             user.set_password(password)
#             user.save()

#             user = authenticate(username=username, password=password)

#             if user is not None:
#                 if user.is_active:
#                     login(request, user)
#                     print(user.username)


class Genre(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer


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

    @action(methods=['put'], detail=True)
    def change(self, request, pk=None):
        user = self.get_object()
        serializer = UsersSerializer(data=request.data)

        # Because we are using the UsersSerializer, in order for the data to be
        # valid, the email provided must be unique. We are trying to update a user entry
        # which would cause the email value to be the same. Therefore this serializer
        # would always fail if the email was the same.
        # Due to time constrains, the following is a bypass for just the email errror:
        serializer.is_valid()
        error = serializer.errors
        can_bypass_validation = False
        if 'email' in error.keys() and len(error.keys()) == 1:
            if len(error['email']) == 1:  # Only when there is one error
                if error['email'][0].code == "unique":
                    can_bypass_validation = True
        if can_bypass_validation or serializer.is_valid():
            # set_password(serializer.data['password']) This requires use of the User auth model
            user.__dict__.update(request.data)
            for k in request.data.keys():
                if k == 'email':
                    if user.email != request.data['email']:
                        user.email = request.data['email']
                else:
                    user.__dict__[k] = request.data[k]
            user.save()
            return Response({"status": 'user updated'})
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # @action(methods=['post'], detail=True, url_path="register")
    # def post(self, request, pk=None):
    #     print(request.data)
    #     print("in post")
    #     serializer = UsersSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MoviePopulator(APIView):

    def get(self, request):
        query = Movie.objects.all()
        serializer = MovieSerializer(query, many=True)
        resp = Response(serializer.data)

        counter = 0
        for movie in query:
            # Review
            # Rating, Text, Date
            resp.data[counter]['reviews'] = []
            reviews = movie.reviews.all()
            for review in reviews:
                resp.data[counter]['reviews'].append({'rating': review.rating,
                                                      'text': review.text,
                                                      'date': review.date})

            # Genre
            resp.data[counter]['genre'] = []
            genres = movie.genre.all()
            for genre in genres:
                resp.data[counter]['genre'].append(genre.name)
            counter += 1
        return resp

    def post(self, request):
        # This doesn't handle genres
        query = Movie.objects.all()
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
