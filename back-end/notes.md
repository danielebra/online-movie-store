# Getting started

1. Install Python
2. Install Django

# Start the server

1. Navigate into the directory:
   ```sh
   cd back-end/
   ```
2. Run the server on http://localhost:8000/:
   ```sh
   python manage.py runserver
   ```

# Migrations

- When you make a change to the database model, you need to run a few commands in order to apply the changes:

1. Make new migrations (creates or updates the SQL commands):
   ```sh
   python manage.py makemigrations movie
   ```
2. Apply migrations to db:
   ```sh
   python manage.py migrate
   ```

# Model commands:

- Get all users: User.objects.all()
- Get user by id: User.objects.filter(id=1)
- Get user by name: User.objects.filter(name='John')

# Create ERD

https://wadewilliams.com/technology-software/generating-erd-for-django-applications/
