CREATE DATABASE mapper;
CREATE USER 'mapper'@'localhost' IDENTIFIED BY 'mapper';
GRANT ALL PRIVILEGES ON mapper.* TO 'mapper'@'localhost';
GRANT FILE ON *.* to mapper@localhost identified by 'mapper';
FLUSH PRIVILEGES;
