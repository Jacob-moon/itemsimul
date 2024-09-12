CREATE TABLE characters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    characterName VARCHAR(50) UNIQUE NOT NULL,
    health INT DEFAULT 500,
    power INT DEFAULT 100,
    money INT DEFAULT 10000,
    userId INT NOT NULL,  
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
