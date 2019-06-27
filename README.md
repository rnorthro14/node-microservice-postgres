# node-microservice-postgres
Template for creating RESTful API with Node.js, Express, and PostgreSQL

** This assumes that you have installed postgres. If you have not yet installed postgres, you can either download the installer at https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
or you can install using homebrew:
```
brew install postgresql
brew services start postgresql
==> Successfully started `postgresql` (label: homebrew.mxcl.postgresql)
```
These instructions use the SQL shell to set up a mock db to test the service. I'd recommend becoming comfortable with the PostgreSQL command prompt: psql. Alternatively, feel free to set up using pgAdmin if you wish.
Using the terminal:
Connect to default postgres db:
```
psql postgres
```
Check your connection:
```
\connifon
```
Create role 'user_admin' used in microservice, then give 'user_admin' rights to create a DB
 
```
CREATE ROLE user_admin WITH LOGIN PASSWORD 'password';
ALTER ROLE me CREATEDB;
```

You can run \du to list all roles/users.
Quit the default session using \q then log back in using 'user_admin'. You will be prompted for your password.
```
psql -d postgres -U me
```
Now, create the db that is indicated in the microservice:
```
CREATE DATABASE users_api;
```
Use ```\list``` to see your available databases, then use ```\c users_api``` to connect to the db you just created.
Create a table, 'users', insert data into table, then select to verify data was correctly inserted:
```
CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30)
);

INSERT INTO users (name, email)
  VALUES ('Jerry', 'jerry@example.com'), ('George', 'george@example.com');
  
SELECT * FROM users;  
```

Once you have your data, you are ready to run the microservice. In a regular terminal window:
```
$ git clone
$ cd node-microservice-postgres
$ npm install
$ npm start
```
Test CRUD operations using your preferred tool, (curl, Postman, etc.)
