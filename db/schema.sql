CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	email VARCHAR(254) UNIQUE NOT NULL,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) DEFAULT NULL,
	password VARCHAR(60) NOT NULL,
	profile_image TEXT NOT NULL,
	balance INT NOT NULL DEFAULT 0,
	CONSTRAINT positive_value CHECK (balance >= 0)
);

CREATE TABLE banners (
	id SERIAL PRIMARY KEY,
	banner_name VARCHAR(255) NOT NULL,
	banner_image TEXT NOT NULL,
	description TEXT
);

CREATE TABLE services (
	id SERIAL PRIMARY KEY,
	service_code VARCHAR(255) NOT NULL,
	service_name VARCHAR(255) NOT NULL,
	service_icon TEXT NOT NULL,
	service_tariff INT NOT NULL
);

CREATE TABLE transactions (
	id SERIAL PRIMARY KEY,
	email VARCHAR(254) NOT NULL,
	FOREIGN KEY (email) REFERENCES users(email),
	invoice_number VARCHAR(15) UNIQUE NOT NULL,
	transaction_type VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL,	
	total_amount INT NOT NULL,
	created_on VARCHAR(24) NOT NULL
);