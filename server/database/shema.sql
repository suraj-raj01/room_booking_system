CREATE TABLE users (
 id INT PRIMARY KEY AUTO_INCREMENT,
 name VARCHAR(100),
 email VARCHAR(100) UNIQUE,
 password VARCHAR(255)
);

CREATE TABLE rooms (
 id INT PRIMARY KEY AUTO_INCREMENT,
 name VARCHAR(100),
 price_per_night DECIMAL(10,2)
);

CREATE TABLE bookings (
 id INT PRIMARY KEY AUTO_INCREMENT,
 user_id INT,
 room_id INT,
 start_date DATE,
 end_date DATE,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

 FOREIGN KEY (user_id) REFERENCES users(id),
 FOREIGN KEY (room_id) REFERENCES rooms(id)
);