-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS users_todos CASCADE;
DROP TABLE IF EXISTS userbase;
DROP TABLE IF EXISTS todos;

CREATE TABLE userbase (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL,
  passwordHash TEXT NOT NULL
);

CREATE TABLE todos (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  content TEXT NOT NULL,
  finished BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE users_todos (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL,
  todo_id BIGINT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES userbase(id),
  FOREIGN KEY (todo_id) REFERENCES todos(id)
);
