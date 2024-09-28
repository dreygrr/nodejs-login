CREATE TABLE users(
    username VARCHAR(255) NOT NULL PRIMARY KEY, 
	name VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL, 
    birthdate DATE
);

CREATE TABLE books(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(255) NOT NULL, 
    color VARCHAR(6), 
    text VARCHAR(255), 
    author VARCHAR(255) NOT NULL, 
    
    FOREIGN KEY (author) REFERENCES users (username)
);

CREATE TABLE shelves(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(255) NOT NULL, 
    username VARCHAR(255) NOT NULL, 
    
    FOREIGN KEY (username) REFERENCES users (username)
);

CREATE TABLE shelves_books(
	id_shelf INT NOT NULL, 
    id_book INT NOT NULL, 
    
    FOREIGN KEY (id_shelf) REFERENCES shelves (id), 
    FOREIGN KEY (id_book) REFERENCES books (id)
);