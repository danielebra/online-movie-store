from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets

from .models import User, Movie, Genre
from .serializers import UsersSerializer, MovieSerializer, GenreSerializer


class Genre(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer


class User(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UsersSerializer


class MovieDefault(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


class MoviePopulator(APIView):
    def get(self, request):
        print("hello there was a get request")
        query = Movie.objects.all()
        serializer = MovieSerializer(query, many=True)
        resp = Response(serializer.data)

        counter = 0
        for movie in query:
            resp.data[counter]['genre'] = []
            genres = movie.genre.all()
            for genre in genres:
                resp.data[counter]['genre'].append(genre.name)
            counter += 1
        return resp

    # print("Hello")
    # queryset = Movie.objects.all()

    # genres = []
    # for movie in queryset:
    #     # import pdb
    #     # pdb.set_trace()
    #     for x in movie.genre.all():
    #         print(x.name)
    #     print(type(movie.genre))
    #     genres.append(movie.genre.all())
    #     # movie.genre.set(movie.genre.all())
    #     # print(movie.genre)
    # serializer_class = MovieSerializer
    # print(genres)


# class oldusersapi(APIView):
#     def get(self, request):
#         query = User.objects.all()
#         serializerJSON = UsersSerializer(query, many=True)
#         return Response(serializerJSON.data)

#     def post(self):
#         pass
