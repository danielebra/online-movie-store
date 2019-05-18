# Generated by Django 2.2 on 2019-05-14 13:24

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import movie.custom_fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, unique=True)),
                ('year', models.IntegerField()),
                ('description', models.TextField()),
                ('thumbnail', models.TextField()),
                ('trailer_link', models.TextField()),
                ('price', models.FloatField()),
                ('maturity_rating', models.CharField(max_length=6)),
                ('purchase_count', models.IntegerField()),
                ('stock', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', movie.custom_fields.IntegerRangeField()),
                ('text', models.TextField()),
                ('date', models.DateField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=16)),
                ('last_name', models.CharField(max_length=16)),
                ('date_of_birth', models.DateField()),
                ('mobile_number', models.TextField()),
                ('shipping_address', models.TextField(blank=True)),
                ('email', models.TextField(unique=True)),
                ('password', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quanitiy', models.IntegerField()),
                ('discount_modifer', models.FloatField()),
                ('total_cost', models.FloatField()),
                ('order_type', models.CharField(default='delivery', max_length=20)),
                ('date', models.DateField(default=django.utils.timezone.now)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movie.User')),
            ],
        ),
        migrations.CreateModel(
            name='MovieReview',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movie.Movie')),
                ('review', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movie.Review')),
            ],
        ),
        migrations.CreateModel(
            name='MovieGenre',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('genre', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movie.Genre')),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movie.Movie')),
            ],
        ),
        migrations.AddField(
            model_name='movie',
            name='genre',
            field=models.ManyToManyField(through='movie.MovieGenre', to='movie.Genre'),
        ),
        migrations.AddField(
            model_name='movie',
            name='reviews',
            field=models.ManyToManyField(through='movie.MovieReview', to='movie.Review'),
        ),
    ]
