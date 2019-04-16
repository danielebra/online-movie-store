from django.contrib import admin
from .models import Movie, User, Review, Genre, MovieGenre, MovieReview

# Register your models here.
admin.site.register(User)
admin.site.register(Movie)
admin.site.register(Review)
admin.site.register(Genre)
admin.site.register(MovieGenre)
admin.site.register(MovieReview)
