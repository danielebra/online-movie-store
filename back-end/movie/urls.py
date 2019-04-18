from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework import routers
from . import views

# The router will generate urls and http methods such as GET, POST, DELETE for that path
router = routers.DefaultRouter()

# first argument is a the url path, second argument is where to handle the request
router.register('api/users', views.User)
router.register('api/deprecated/movie', views.MovieDefault)
router.register('api/genre', views.Genre)

urlpatterns = [
    path('', include(router.urls)),
    path('api/movie/', views.MoviePopulator.as_view()),
    #path('', views.home, name='Home-page'),
    # path('login/', views.Users.as_view()),
    # path('register/', views.register, name='Register-page'),
]
