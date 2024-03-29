CREATE TABLE IF NOT EXISTS users(
   user_id serial PRIMARY KEY,
   name varchar(255) NOT NULL,
   email varchar(255) UNIQUE NOT NULL,
   phone varchar(20) NOT NULL,
   password varchar(255) NOT NULL,
   avatar varchar(255),
   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS recipes(
   recipe_id serial PRIMARY KEY,
   title varchar(255) NOT NULL,
   ingredients text[],
   photo varchar(255),
   videos varchar[],
   category varchar(255),
   variant varchar(255),
   restaurant varchar(255),
   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
   user_id int REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comments(
   comment_id serial PRIMARY KEY,
   message text,
   user_id int REFERENCES users(user_id),
   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
   recipe_id int REFERENCES recipes(recipe_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS liked_recipe(
   liked_id serial PRIMARY KEY,
   user_id int REFERENCES users(user_id) ON DELETE CASCADE,
   recipe_id int REFERENCES recipes(recipe_id) ON DELETE CASCADE,
   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS saved_recipe(
   save_id serial PRIMARY KEY,
   user_id int REFERENCES users(user_id) ON DELETE CASCADE,
   recipe_id int REFERENCES recipes(recipe_id) ON DELETE CASCADE,
   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);