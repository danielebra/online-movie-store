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


class RegisterView(APIView):

    queryset = UserModel.objects.all()
    # print("register")
    # # This prevents the error: has no attribute 'get_extra_actions'
    # @classmethod
    # def get_extra_actions(cls):
    #     return []

    def get(self, request):
        return Response()
        # print(request.data)
        # query = UserModel.objects.all()
        # serializer = UsersSerializer(query, many=True)
        # resp = Response(serializer.data)
        # return resp

    def post(self, request):
        print(request.data)
        serializer = UsersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
