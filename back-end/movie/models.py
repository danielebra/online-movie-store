from django.db import models
from django.utils import timezone
from .custom_fields import IntegerRangeField  # IntegerRangeField


class User(models.Model):
    first_name = models.CharField(max_length=16)
    last_name = models.CharField(max_length=16)
    date_of_birth = models.DateField()
    mobile_number = models.TextField()
    shipping_address = models.TextField(blank=True)
    email = models.EmailField(unique=True)
    password = models.TextField()
    is_admin = models.TextField()

    def __str__(self):
        return self.first_name + ' ' + self.last_name


class LogModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.TextField()
    time_stamp = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return '{0} | {1}'.format(self.user.email, str(self.time_stamp))


class Review(models.Model):
    rating = IntegerRangeField(min_value=0, max_value=10)
    text = models.TextField()
    date = models.DateTimeField(default=timezone.now)
    name = models.TextField()

    def __str__(self):
        return str(self.rating) + ' | ' + self.text


class Genre(models.Model):
    name = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name


class Movie(models.Model):
    title = models.CharField(max_length=100, unique=True)
    year = models.IntegerField()
    description = models.TextField()
    thumbnail = models.TextField()
    trailer_link = models.TextField()
    reviews = models.ManyToManyField(Review, through='MovieReview')
    genre = models.ManyToManyField(Genre, through='MovieGenre')
    price = models.FloatField()
    maturity_rating = models.CharField(max_length=6)
    purchase_count = models.IntegerField()
    stock = models.IntegerField()

    def __str__(self):
        return self.title + ' ' + str(self.year)


class MovieReview(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    review = models.ForeignKey(Review, on_delete=models.CASCADE)

    def __str__(self):
        return self.movie.title + ' | ' + str(self.review.rating)


class MovieGenre(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)

    def __str__(self):
        return self.movie.title + ' | ' + self.genre.name


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    discount_modifier = models.FloatField()
    total_cost = models.FloatField()
    order_type = models.CharField(default='delivery', max_length=20)
    date = models.DateTimeField(default=timezone.now)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)

# This is to have order support multiple movies (not being used)


class MovieOrder(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)

    def __str__(self):
        return self.order.user.email + ' | ' + self.movie.title
