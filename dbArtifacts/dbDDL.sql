DROP schema `dbproj`;
CREATE SCHEMA `dbproj`;

CREATE TABLE `dbproj`.`Users` (
  `id` INT auto_increment,
  `firstName` VARCHAR(200) NOT NULL,
  `lastName` VARCHAR(200) NOT NULL,
  `email` VARCHAR(200),
  `phone` VARCHAR(10),
  `username` VARCHAR(200) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `address` VARCHAR(200),
  `userRole` enum('CUSTOMER', 'ADMIN') NOT NULL default 'CUSTOMER',
  `dateCreated` DATETIME NOT NULL default now(),
  `url` VARCHAR(200),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC));
  
CREATE TABLE `dbproj`.`Products` (
  `id` INT auto_increment,
  `name` VARCHAR(200) NOT NULL,
  `description` BLOB,
  `category` VARCHAR(100) NOT NULL,
  `size`enum('Small', 'Medium', 'Large') NOT NULL,
  `extId` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`));
  
CREATE TABLE `dbproj`.`Messages` (
  `id` INT auto_increment,
  `sender` INT not null,
  `receiver` INT not null,
  `byEmail` VARCHAR(200) not null,
  `subject` VARCHAR(200) NOT NULL,
  `description` VARCHAR(200),
  `dateCreated` DATETIME NOT NULL default now(),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`sender`) references `dbproj`.`Users`(`id`)
  on update cascade on delete cascade,
  FOREIGN KEY (`receiver`) references `dbproj`.`Users`(`id`)
  on update cascade on delete cascade);
  
CREATE TABLE `dbproj`.`Lendings` (
  `lender` INT not null,
  `productId` INT not null,
  `price` INT NOT NULL,
  `quantity`INT NOT NULL default 1,
  `availableFrom` DATETIME NOT NULL default now(),
  `availableTo` DATETIME NOT NULL default now(),
  `available`boolean NOT NULL default true,
  PRIMARY KEY (`lender`,`productId`),
  FOREIGN KEY (`lender`) references `dbproj`.`Users`(`id`)
  on update cascade on delete cascade,
  FOREIGN KEY (`productId`) references `dbproj`.`Products`(`id`)
  on update cascade on delete cascade);
  
CREATE TABLE `dbproj`.`Rentals` (
  `lender` INT not null,
  `productId` INT not null,
  `renter` INT not null,
  `rentedQty`INT NOT NULL default 1,
  `rentedFrom` DATETIME NOT NULL default now(),
  `rentedTo` DATETIME NOT NULL default now(),
  `dateCreated` DATETIME NOT NULL default now(),
  PRIMARY KEY (`lender`,`productId`,`renter`),
  FOREIGN KEY (`lender`,`productId`) references `dbproj`.`Lendings`(`lender`,`productId`)
  on update cascade on delete cascade,
  FOREIGN KEY (`renter`) references `dbproj`.`Users`(`id`)
  on update cascade on delete cascade);
  
CREATE TABLE `dbproj`.`ProductReviews` (
  `id` INT auto_increment,
  `reviewer` INT not null,
  `productId` INT not null,
  `rating` INT NOT NULL default 1,
  `title` VARCHAR(100) NOT NULL,
  `description` VARCHAR(200),
  `dateCreated` DATETIME NOT NULL default now(),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`reviewer`) references `dbproj`.`Users`(`id`)
  on update cascade on delete cascade,
  FOREIGN KEY (`productId`) references `dbproj`.`Products`(`id`)
  on update cascade on delete cascade);
  
CREATE TABLE `dbproj`.`UserReviews` (
  `id` INT auto_increment,
  `reviewer` INT not null,
  `reviewFor` INT not null,
  `rating` INT NOT NULL default 1,
  `title` VARCHAR(100) NOT NULL,
  `description` VARCHAR(200),
  `dateCreated` DATETIME NOT NULL default now(),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`reviewer`) references `dbproj`.`Users`(`id`)
  on update cascade on delete cascade,
  FOREIGN KEY (`reviewFor`) references `dbproj`.`Users`(`id`)
  on update cascade on delete cascade);
  
CREATE TABLE `dbproj`.`Likes` (
  `likedBy` INT not null,
  `likes` INT not null,
  PRIMARY KEY (`likedBy`,`likes`),
  FOREIGN KEY (`likedBy`) references `dbproj`.`Users`(`id`)
  on update cascade on delete cascade,
  FOREIGN KEY (`likes`) references `dbproj`.`Users`(`id`)
  on update cascade on delete cascade);
  
CREATE TABLE `dbproj`.`Follows` (
  `followedBy` INT not null,
  `follows` INT not null,
  PRIMARY KEY (`followedBy`,`follows`),
  FOREIGN KEY (`followedBy`) references `dbproj`.`Users`(`id`)
  on update cascade on delete cascade,
  FOREIGN KEY (`follows`) references `dbproj`.`Users`(`id`)
  on update cascade on delete cascade);
