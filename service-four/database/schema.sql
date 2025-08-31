CREATE SCHEMA `service_four` ;
USE `service_four`;
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
	best_friend_id INT,
	PRIMARY KEY (id)
    
);

create table users_access_historic (
	id INT AUTO_INCREMENT UNIQUE,
	user_id INT,
	access_datetime DATE,
	leave_datetime DATE,
	PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);




-- RUN AFTER MOCK 
ALTER TABLE users ADD CONSTRAINT fk_best_friend_id FOREIGN KEY (best_friend_id) REFERENCES users(id);
