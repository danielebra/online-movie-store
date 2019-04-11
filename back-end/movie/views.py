from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets

from .models import User, Movie
from .serializers import UsersSerializer, MovieSerializer


class User(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UsersSerializer


class Movie(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer










# class oldusersapi(APIView):
#     def get(self, request):
#         query = User.objects.all()
#         serializerJSON = UsersSerializer(query, many=True)
#         return Response(serializerJSON.data)

#     def post(self):
#         pass
