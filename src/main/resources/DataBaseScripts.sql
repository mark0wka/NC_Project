-- Database: CinemaDB

-- DROP DATABASE "CinemaDB";

CREATE DATABASE "CinemaDB"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Russian_Russia.1251'
    LC_CTYPE = 'Russian_Russia.1251'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

CREATE TABLE objectList (
	id serial PRIMARY KEY,
	object_type_id serial NOT null,
	name varchar(50) NOT null
)

CREATE TABLE objectAttributeList (
	id serial PRIMARY KEY,
	attribute_id serial NOT null,
	value serial NOT null,
	date_value date NOT null
)

CREATE TABLE userList (
	id serial PRIMARY KEY,
	login varchar(50) NOT null,
	password varchar(50) NOT null,
	role varchar(50) NOT null,
	email varchar(50) NOT null
)