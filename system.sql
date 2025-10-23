CREATE DATABASE school_management;
GO

USE school_management;
GO

CREATE TABLE users (
  id INT IDENTITY(1,1) PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  role VARCHAR(10) CHECK (role IN ('student', 'faculty')) NOT NULL
);
GO

INSERT INTO users (username, password, role)
VALUES 
('student1', '1234', 'student'),
('faculty1', 'abcd', 'faculty');
GO
