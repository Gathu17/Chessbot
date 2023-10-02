CREATE TABLE Games (
  id INT AUTO_INCREMENT PRIMARY KEY,
  status ENUM('active', 'inactive'),
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ended_at TIMESTAMP DEFAULT NULL,
  winner_id INT,
  FOREIGN KEY (winner_id) REFERENCES Users(id)
);

CREATE TABLE Scores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  opponentId INT,
  gameId INT,
  game_outcome ENUM('win', 'lose', 'draw'),
  timestamps TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES Users(id),
  FOREIGN KEY (opponentId) REFERENCES Users(id),
  FOREIGN KEY (gameId) REFERENCES Game(id)
);

CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  password VARCHAR(255),
  timestamps TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
