CREATE TABLE IF NOT EXISTS users(
   user_id serial PRIMARY KEY,
   name varchar(255) NOT NULL,
   email varchar(255) UNIQUE NOT NULL,
   phone varchar(20) NOT NULL,
   password varchar(255) NOT NULL,
   photo varchar(255)
);

CREATE TABLE IF NOT EXISTS recipes(
   recipe_id serial PRIMARY KEY,
   title varchar(255) NOT NULL,
   ingredients text[],
   photo varchar(255),
   videos varchar[],
   created_at timestamp,
   user_id int REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS comments(
   comment_id serial PRIMARY KEY,
   message text,
   user_id int REFERENCES users(user_id),
   recipe_id int REFERENCES recipes(recipe_id)
);

CREATE TABLE IF NOT EXISTS liked_recipe(
   liked_id serial PRIMARY KEY,
   user_id int REFERENCES users(user_id),
   recipe_id int REFERENCES recipes(recipe_id)
);

CREATE TABLE IF NOT EXISTS saved_recipe(
   save_id serial PRIMARY KEY,
   user_id int REFERENCES users(user_id),
   recipe_id int REFERENCES recipes(recipe_id)
);

ALTER TABLE comments ADD created_at timestamp;