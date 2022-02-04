CREATE DATABASE "CinemaDB"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Russian_Russia.1251'
    LC_CTYPE = 'Russian_Russia.1251'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

CREATE TABLE object_list (
	object_id serial PRIMARY KEY,
	object_type_id varchar(50) NOT null,
	name varchar(50) NOT null
)

CREATE TABLE object_attribute_list(
	attr_id serial PRIMARY KEY,
	object_id serial REFERENCES object_list(object_id),
	name varchar(50) NOT null,
	value varchar(50) NOT null
)