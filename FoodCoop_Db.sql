-- MySQL Script generated by MySQL Workbench
-- Fri Jul 26 15:56:36 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema FoodCoop
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `FoodCoop` ;

-- -----------------------------------------------------
-- Schema FoodCoop
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `FoodCoop` DEFAULT CHARACTER SET utf8 ;
USE `FoodCoop` ;

-- -----------------------------------------------------
-- Table `FoodCoop`.`Customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FoodCoop`.`Customer` (
  `idCustomer` INT NOT NULL,
  `CustFName` VARCHAR(45) NULL,
  `CustLName` VARCHAR(45) NULL,
  `CustLineAddr` VARCHAR(45) NULL,
  `CustLine2Addr` VARCHAR(45) NULL,
  `CustCity` VARCHAR(45) NULL,
  `CustState` VARCHAR(45) NULL,
  `CustZip` VARCHAR(45) NULL,
  PRIMARY KEY (`idCustomer`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FoodCoop`.`Vendor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FoodCoop`.`Vendor` (
  `idVendor` INT NOT NULL,
  `VendFName` VARCHAR(45) NULL,
  `VendLName` VARCHAR(45) NULL,
  `VendAddrLine1` VARCHAR(45) NULL,
  `VendAddrLine2` VARCHAR(45) NULL,
  `VendAddrCity` VARCHAR(45) NULL,
  `VendAddrState` VARCHAR(45) NULL,
  `VendAddrZip` VARCHAR(45) NULL,
  PRIMARY KEY (`idVendor`))
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `FoodCoop`.`MemberPrivilege`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FoodCoop`.`MemberPrivilege` (
  `idMemberPrivilege` INT NOT NULL,
  PRIMARY KEY (`idMemberPrivilege`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FoodCoop`.`CustomerSearchHistory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FoodCoop`.`CustomerSearchHistory` (
  `idCustomerSearchHistory` INT NOT NULL AUTO_INCREMENT,
  `idCustomer` INT NOT NULL,
  `SearchText` VARCHAR(45) NULL,
  `DateTime` DATETIME NOT NULL,
  PRIMARY KEY (`idCustomerSearchHistory`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FoodCoop`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FoodCoop`.`product` (
  `idProduct` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NULL,
  `ShortDescription` LONGTEXT NULL,
  `Description` VARCHAR(45) NULL,
  `Price` FLOAT NULL,
  `Available` INT NULL,
  `productcol` VARCHAR(45) NULL,
  `idVendor` INT NOT NULL,
  PRIMARY KEY (`idProduct`),
  INDEX `fk_product_Vendor_idx` (`idVendor` ASC),
  CONSTRAINT `fk_product_Vendor`
    FOREIGN KEY (`idVendor`)
    REFERENCES `FoodCoop`.`Vendor` (`idVendor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FoodCoop`.`PurchaseHistory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FoodCoop`.`PurchaseHistory` (
  `PurHistID` VARCHAR(45) NULL,
  `Customer_idCustomer` INT NOT NULL,
  `product_idProduct` INT NOT NULL,
  `Quantity` INT NULL,
  `DateTime` DATETIME NULL,
  PRIMARY KEY (`Customer_idCustomer`, `product_idProduct`),
  INDEX `fk_Customer_has_product_product1_idx` (`product_idProduct` ASC),
  INDEX `fk_Customer_has_product_Customer1_idx` (`Customer_idCustomer` ASC),
  CONSTRAINT `fk_Customer_has_product_Customer1`
    FOREIGN KEY (`Customer_idCustomer`)
    REFERENCES `FoodCoop`.`Customer` (`idCustomer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Customer_has_product_product1`
    FOREIGN KEY (`product_idProduct`)
    REFERENCES `FoodCoop`.`product` (`idProduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FoodCoop`.`CustReview`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FoodCoop`.`CustReview` (
  `CustReviewId` VARCHAR(45) NULL,
  `product_idProduct` INT NOT NULL,
  `Customer_idCustomer` INT NOT NULL,
  `Comment` TEXT NULL,
  `DateTime` DATETIME NULL,
  `Rating` INT NOT NULL,
  PRIMARY KEY (`product_idProduct`, `Customer_idCustomer`),
  INDEX `fk_product_has_Customer_Customer1_idx` (`Customer_idCustomer` ASC),
  INDEX `fk_product_has_Customer_product1_idx` (`product_idProduct` ASC),
  CONSTRAINT `fk_product_has_Customer_product1`
    FOREIGN KEY (`product_idProduct`)
    REFERENCES `FoodCoop`.`product` (`idProduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_has_Customer_Customer1`
    FOREIGN KEY (`Customer_idCustomer`)
    REFERENCES `FoodCoop`.`Customer` (`idCustomer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
