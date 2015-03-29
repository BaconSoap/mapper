CREATE DATABASE mapper;
CREATE USER 'mapper'@'localhost' IDENTIFIED BY 'mapper';
GRANT ALL PRIVILEGES ON mapper.* TO 'mapper'@'localhost';
FLUSH PRIVILEGES;
