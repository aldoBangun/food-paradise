# Food Paradise RESTful API
> Food Recipe API created with ExpressJS and PostgreSQL

### Demo App

1. Clone this repo 

   ``` 
   git clone https://github.com/aldobangun/food-paradise.git food-paradise
   ```

2. Go to app directory

   ```
   cd food-paradise
   ```

3. Install dependencies using `npm install`
4. Create new database named `food_paradise`
5. Create database tables by running this command in your terminal

   ```
   psql -U <db_username> -h <db_host> -p <db_port> -d <db_name> -f config/tables.sql
   ```

   for example: 

   ```
   psql -U postgres -h localhost -p 5432 -d food_paradise -f config/tables.sql
   ```

   and then enter your database password

6. Rename `.env.example` to `.env`
7. Open `.env` and insert your environment variables there
8. Run the server using `npm run dev`
9. [Download](https://www.postman.com/downloads/) or Open Postman
10. To easily test the API you can download and import this [postman collection](https://drive.google.com/file/d/1oYDpf51dxbIa4T9JpgWm3FGH3s6namFa/view?usp=sharing) to your postman

### API Documentation

Here is the API [Documentation](https://documenter.getpostman.com/view/13579110/UzBsKQv8) created by [Postman](https://www.postman.com/)