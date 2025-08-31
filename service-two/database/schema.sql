CREATE SCHEMA `service_two` ;
USE `service_two`;
create table users (
	id INT AUTO_INCREMENT UNIQUE,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	email VARCHAR(50),
	gender VARCHAR(50),
	ip_address VARCHAR(20),
	lon VARCHAR(50),
	lat VARCHAR(50),
	guid VARCHAR(40),
	language VARCHAR(100),
	PRIMARY KEY (id)
);
