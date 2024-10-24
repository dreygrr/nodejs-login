CREATE TABLE users(
    username VARCHAR(255) NOT NULL PRIMARY KEY, 
	name VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL, 
    birthdate DATE
);

CREATE TABLE books(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(255) NOT NULL, 
    color VARCHAR(7), 
    content TEXT, 
    author VARCHAR(255) NOT NULL, 
    FOREIGN KEY (author) REFERENCES users (username) ON DELETE CASCADE
);


CREATE TABLE shelves(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(255) NOT NULL, 
    author VARCHAR(255) NOT NULL, 
    color VARCHAR(7), 
    
    FOREIGN KEY (author) REFERENCES users (username)
);

CREATE TABLE shelves_books(
    id_shelf INT NOT NULL, 
    id_book INT NOT NULL, 
    FOREIGN KEY (id_shelf) REFERENCES shelves (id) ON DELETE CASCADE, 
    FOREIGN KEY (id_book) REFERENCES books (id)
);
