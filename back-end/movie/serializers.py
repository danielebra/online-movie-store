from rest_framework import serializers

from .models import User, Movie

 # convert models to json, each seralise has a model and fields to display
class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'