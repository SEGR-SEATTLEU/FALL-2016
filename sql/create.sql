CREATE DATABASE `wta`;

USE `wta`;

CREATE TABLE gender (
  id INT NOT NULL AUTO_INCREMENT,
  gender VARCHAR(250),
  PRIMARY KEY(id)
  );
  
CREATE TABLE size (
  id INT NOT NULL AUTO_INCREMENT,
  size VARCHAR(250),
  PRIMARY KEY(id)
  );

CREATE TABLE gear_item (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(1000) NOT NULL,
  image_url VARCHAR(1000),
  care_maintenance VARCHAR(1000),
  sizing_table VARCHAR(1000),
  description VARCHAR(1000),
  gender_id INT NOT NULL,
  size_id INT NOT NULL,
  total_quantity INT NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT fk_gender_id FOREIGN KEY (gender_id) REFERENCES gender(id), 
  CONSTRAINT fk_size_id FOREIGN KEY (size_id) REFERENCES size(id)
  );
  
CREATE TABLE `status` (
  id INT NOT NULL AUTO_INCREMENT,
  status VARCHAR(250),
  PRIMARY KEY(id)
  );
  
CREATE TABLE `role` (
  id INT NOT NULL AUTO_INCREMENT,
  role_name VARCHAR(250),
  PRIMARY KEY(id)
  );
  
CREATE TABLE personnel_info (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(1000) NOT NULL,
  role_id INT NOT NULL,
  email VARCHAR(1000),
  phone_number VARCHAR(1000),
  address_line_1 VARCHAR(1000),
  address_line_2 VARCHAR(1000),
  address_line_3 VARCHAR(1000),
  city VARCHAR(1000),
  state VARCHAR(2),
  zip_code VARCHAR(12),
  PRIMARY KEY(id),
  CONSTRAINT fk_role_id FOREIGN KEY (role_id) REFERENCES `role`(id)
  );
  
CREATE TABLE request (
  id INT NOT NULL AUTO_INCREMENT,
  customer_id INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status_id INT NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT fk_customer_id FOREIGN KEY (customer_id) REFERENCES personnel_info(id),
  CONSTRAINT fk_status_id FOREIGN KEY (status_id) REFERENCES status(id)
  );
  
CREATE TABLE reserved_item (
  id INT NOT NULL AUTO_INCREMENT,
  request_id INT NOT NULL,
  item_id INT NOT NULL,
  quantity INT NOT NULL,
  status_id INT NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT fk_request_id FOREIGN KEY (request_id) REFERENCES request(id),
  CONSTRAINT fk_item_id FOREIGN KEY (item_id) REFERENCES gear_item(id),
  CONSTRAINT fk_ri_status_id FOREIGN KEY (status_id) REFERENCES status(id)
  );
  
