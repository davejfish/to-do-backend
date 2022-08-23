-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS todos;
DROP TABLE IF EXISTS userbase;


CREATE TABLE userbase (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL,
  passwordHash TEXT NOT NULL
);

CREATE TABLE todos (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL,
  content TEXT NOT NULL,
  finished BOOLEAN DEFAULT 'false',
  FOREIGN KEY (user_id) REFERENCES userbase(id)
);
