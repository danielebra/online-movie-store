from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def home(request):
    return HttpResponse('<h1> Movie Home Page </h1>')

def login(request):
    return HttpResponse('<h1> Login Page </h1>')

def register(request):
    return HttpResponse('<h1> Register Page </h1>')