# online-movie-store

41025 ISD

# Online Deployment

[![Netlify Status](https://api.netlify.com/api/v1/badges/1b556842-c991-4ebb-84ab-1dbf4391e4a0/deploy-status)](https://app.netlify.com/sites/online-movie-store/deploys)

[Live Website](https://online-movie-store.netlify.com/)

# Local Deployment

## Backend

### Getting started

1. Install Python 3.6
2. Install Django

#### Environment

1. Navigate into the directory:
   ```sh
   cd back-end/
   ```
2. Setup virtual environment:
   ```sh
   virtualenv -p python3 env_oms_be
   source /env_oms_be/bin/activate
   ```
3. Install Packages:

   ```sh
   pip install -r requirements.txt
   ```

#### Django

Django requires the creation of migration files.

1. Make new migrations (creates or updates the SQL commands):
   ```sh
   python manage.py makemigrations
   ```
2. Apply migrations:

   ```sh
   python manage.py migrate
   ```

#### Run it

4. Run the server on http://localhost:8000/:
   ```sh
   python manage.py runserver
   ```

## Frontend

1. Navigate into the directory:

   ```sh
   cd front-end/
   ```

2. Install required modules
   ```sh
   npm install
   ```
3. Run the server on http://localhost:8080/
   ```sh
   npm run start
   ```
