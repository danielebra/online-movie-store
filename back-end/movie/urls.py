from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework import routers
from . import views

# The router will generate urls and http methods such as GET, POST, DELETE for that path
router = routers.DefaultRouter()

# first argument is a the url path, second argument is where to handle the request
router.register('api/user', views.User)  # returns all users
router.register('api/genre', views.Genre)
router.register('api/movie', views.MoviePopulator)
router.register('api/review', views.ReviewView)
router.register('api/order', views.OrderView)
router.register('api/logs', views.LogView)


urlpatterns = [
    path('', include(router.urls)),
    # path('api/movie/', views.MoviePopulator.as_view())
]
