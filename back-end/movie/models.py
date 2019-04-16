from django.db import models
from django.utils import timezone

class User(models.Model):
    first_name = models.CharField(max_length=16)
    last_name = models.CharField(max_length=16)
    date_of_birth = models.DateField()
    mobile_number = models.TextField()
    shipping_address = models.TextField()
    email = models.TextField(unique=True)
    password = models.TextField()
    def __str__(self):
        return self.first_name + ' ' + self.last_name

class Review(models.Model):
    rating = models.TextField()
    text = models.TextField()
    date = models.DateField(default=timezone.now)

class Movie(models.Model):
    title = models.CharField(max_length=100)
    year = models.IntegerField()
    description = models.TextField()
    thumbnail = models.TextField()
    trailer_link = models.TextField()
    reviews = models.ManyToManyField(Review, through='MovieReviews')
    genre = models.CharField(max_length=20)
    price = models.FloatField()
    maturity_rating = models.CharField(max_length=6)
    pruchase_count = models.IntegerField()
    stock = models.IntegerField()

    def __str__(self):
        return self.title + ' ' + str(self.year)

class MovieReviews (models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    review = models.ForeignKey(Review, on_delete=models.CASCADE)

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quanitiy = models.IntegerField()
    discount_modifer = models.FloatField()
    total_cost = models.FloatField()
    order_type = models.CharField(default='delivery', max_length=20)
    date = models.DateField(default=timezone.now)

