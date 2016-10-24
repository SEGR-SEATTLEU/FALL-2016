-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema wta_glls_db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `wta_glls_db` ;

-- -----------------------------------------------------
-- Schema wta_glls_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `wta_glls_db` DEFAULT CHARACTER SET utf8 ;
USE `wta_glls_db` ;

-- -----------------------------------------------------
-- Table `wta_glls_db`.`size`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wta_glls_db`.`size` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wta_glls_db`.`gender`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wta_glls_db`.`gender` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wta_glls_db`.`gear_item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wta_glls_db`.`gear_item` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `image_url` VARCHAR(45) NULL,
  `care_maintenance` VARCHAR(45) NULL,
  `size_table` VARCHAR(45) NULL,
  `total_quantity` INT NULL,
  `size_id` INT NOT NULL,
  `gender_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_gear_item_size_idx` (`size_id` ASC),
  INDEX `fk_gear_item_gender1_idx` (`gender_id` ASC),
  CONSTRAINT `fk_gear_item_size`
    FOREIGN KEY (`size_id`)
    REFERENCES `wta_glls_db`.`size` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_gear_item_gender1`
    FOREIGN KEY (`gender_id`)
    REFERENCES `wta_glls_db`.`gender` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wta_glls_db`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wta_glls_db`.`roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wta_glls_db`.`personal_information`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wta_glls_db`.`personal_information` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `address` VARCHAR(45) NULL,
  `roles_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_personal_information_roles1_idx` (`roles_id` ASC),
  CONSTRAINT `fk_personal_information_roles1`
    FOREIGN KEY (`roles_id`)
    REFERENCES `wta_glls_db`.`roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wta_glls_db`.`status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wta_glls_db`.`status` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `request_status` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wta_glls_db`.`request`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wta_glls_db`.`request` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `start_date` DATE NULL,
  `end_date` DATE NULL,
  `personal_information_id` INT NOT NULL,
  `status_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_request_personal_information1_idx` (`personal_information_id` ASC),
  INDEX `fk_request_status1_idx` (`status_id` ASC),
  CONSTRAINT `fk_request_personal_information1`
    FOREIGN KEY (`personal_information_id`)
    REFERENCES `wta_glls_db`.`personal_information` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_request_status1`
    FOREIGN KEY (`status_id`)
    REFERENCES `wta_glls_db`.`status` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wta_glls_db`.`reserved_item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wta_glls_db`.`reserved_item` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `quantity` INT NULL,
  `request_id` INT NOT NULL,
  `gear_item_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_reserved_item_request1_idx` (`request_id` ASC),
  INDEX `fk_reserved_item_gear_item1_idx` (`gear_item_id` ASC),
  CONSTRAINT `fk_reserved_item_request1`
    FOREIGN KEY (`request_id`)
    REFERENCES `wta_glls_db`.`request` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_reserved_item_gear_item1`
    FOREIGN KEY (`gear_item_id`)
    REFERENCES `wta_glls_db`.`gear_item` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
