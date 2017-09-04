DROP DATABASE IF EXISTS ridestats;
CREATE DATABASE ridestats;

\c ridestats;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  picture VARCHAR,
  rider_id VARCHAR,
  first_name VARCHAR,
  last_name VARCHAR,
  email VARCHAR,
  uuid VARCHAR
);

CREATE TABLE uber_auth (
  ID SERIAL PRIMARY KEY,
  id_users integer REFERENCES users (ID),
  access_token VARCHAR,
  expires_in INT,
  refresh_token VARCHAR
);

CREATE TABLE rides (
  ID SERIAL PRIMARY KEY,
  id_users integer REFERENCES users (ID),
  distance REAL,
  start_time INT,
  end_time INT,
  request_time INT
);

CREATE TABLE start_city (
  ID SERIAL PRIMARY KEY,
  id_ride integer REFERENCES ride (ID),
  display_name VARCHAR,
  latitude REAL,
  longitude REAL
);

INSERT INTO users (username, password)
  VALUES ('admin', 'admin');
