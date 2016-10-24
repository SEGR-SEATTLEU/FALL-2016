-- MySQL dump 10.13  Distrib 5.7.9, for osx10.9 (x86_64)
--
-- Host: localhost    Database: wta_glls_db
-- ------------------------------------------------------
-- Server version	5.7.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `gear_item`
--

DROP TABLE IF EXISTS `gear_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gear_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `image_url` varchar(45) DEFAULT NULL,
  `care_maintenance` varchar(45) DEFAULT NULL,
  `size_table` varchar(45) DEFAULT NULL,
  `total_quantity` int(11) DEFAULT NULL,
  `size_id` int(11) NOT NULL,
  `gender_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_gear_item_size_idx` (`size_id`),
  KEY `fk_gear_item_gender1_idx` (`gender_id`),
  CONSTRAINT `fk_gear_item_gender1` FOREIGN KEY (`gender_id`) REFERENCES `gender` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_gear_item_size` FOREIGN KEY (`size_id`) REFERENCES `size` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gear_item`
--

LOCK TABLES `gear_item` WRITE;
/*!40000 ALTER TABLE `gear_item` DISABLE KEYS */;
INSERT INTO `gear_item` VALUES (1,'Fleece Jacket',NULL,NULL,NULL,NULL,10,1,2),(2,'Fleece Jacket',NULL,NULL,NULL,NULL,12,2,2),(3,'Fleece Jacket',NULL,NULL,NULL,NULL,15,3,2),(4,'Fleece Jacket',NULL,NULL,NULL,NULL,8,4,2),(5,'Fleece Jacket',NULL,NULL,NULL,NULL,4,5,2),(6,'Fleece Jacket',NULL,NULL,NULL,NULL,20,2,3),(7,'Fleece Jacket',NULL,NULL,NULL,NULL,25,3,3),(8,'Rain Jacket',NULL,NULL,NULL,NULL,6,1,2),(9,'Rain Jacket',NULL,NULL,NULL,NULL,8,2,2),(10,'Rain Jacket',NULL,NULL,NULL,NULL,8,3,2),(11,'Rain Jacket',NULL,NULL,NULL,NULL,4,4,2),(12,'Rain Jacket',NULL,NULL,NULL,NULL,4,5,2),(13,'Rain Jacket',NULL,NULL,NULL,NULL,12,2,3),(14,'Rain Jacket',NULL,NULL,NULL,NULL,12,3,3),(15,'Boots',NULL,NULL,NULL,NULL,4,12,5),(16,'Boots',NULL,NULL,NULL,NULL,4,13,5),(17,'Boots',NULL,NULL,NULL,NULL,4,14,5),(18,'Boots',NULL,NULL,NULL,NULL,4,15,5),(19,'Boots',NULL,NULL,NULL,NULL,6,16,5),(20,'Boots',NULL,NULL,NULL,NULL,6,17,5),(21,'Boots',NULL,NULL,NULL,NULL,6,18,5),(22,'Boots',NULL,NULL,NULL,NULL,8,19,5),(23,'Boots',NULL,NULL,NULL,NULL,8,20,5),(24,'Boots',NULL,NULL,NULL,NULL,8,21,5),(25,'Boots',NULL,NULL,NULL,NULL,6,22,5),(26,'Boots',NULL,NULL,NULL,NULL,4,23,5),(27,'Boots',NULL,NULL,NULL,NULL,2,24,5),(28,'Boots',NULL,NULL,NULL,NULL,4,6,4),(29,'Boots',NULL,NULL,NULL,NULL,4,7,4),(30,'Boots',NULL,NULL,NULL,NULL,4,8,4),(31,'Boots',NULL,NULL,NULL,NULL,4,9,4),(32,'Boots',NULL,NULL,NULL,NULL,6,10,4),(33,'Boots',NULL,NULL,NULL,NULL,6,11,4),(34,'Boots',NULL,NULL,NULL,NULL,8,12,4),(35,'Boots',NULL,NULL,NULL,NULL,8,13,4),(36,'Boots',NULL,NULL,NULL,NULL,6,14,4),(37,'Boots',NULL,NULL,NULL,NULL,6,15,4),(38,'Boots',NULL,NULL,NULL,NULL,4,16,4),(39,'Boots',NULL,NULL,NULL,NULL,4,17,4),(40,'Boots',NULL,NULL,NULL,NULL,2,18,4),(41,'Boots',NULL,NULL,NULL,NULL,4,8,3),(42,'Boots',NULL,NULL,NULL,NULL,4,9,3),(43,'Boots',NULL,NULL,NULL,NULL,6,10,3),(44,'Boots',NULL,NULL,NULL,NULL,8,11,3),(45,'Boots',NULL,NULL,NULL,NULL,10,12,3),(46,'Boots',NULL,NULL,NULL,NULL,10,13,3),(47,'Boots',NULL,NULL,NULL,NULL,12,14,3),(48,'Boots',NULL,NULL,NULL,NULL,8,15,3),(49,'Boots',NULL,NULL,NULL,NULL,6,16,3),(50,'Boots',NULL,NULL,NULL,NULL,4,17,3),(51,'Boots',NULL,NULL,NULL,NULL,4,18,3),(52,'Beanie',NULL,NULL,NULL,NULL,18,26,2),(53,'Beanie',NULL,NULL,NULL,NULL,20,26,3),(54,'Tent',NULL,NULL,NULL,NULL,4,30,1),(55,'Tent',NULL,NULL,NULL,NULL,4,31,1),(56,'Compass',NULL,NULL,NULL,NULL,10,25,1);
/*!40000 ALTER TABLE `gear_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gender`
--

DROP TABLE IF EXISTS `gender`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gender` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gender`
--

LOCK TABLES `gender` WRITE;
/*!40000 ALTER TABLE `gender` DISABLE KEYS */;
INSERT INTO `gender` VALUES (1,'N/A'),(2,'Adult'),(3,'Youth'),(4,'Women\'s'),(5,'Men\'s');
/*!40000 ALTER TABLE `gender` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_information`
--

DROP TABLE IF EXISTS `personal_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personal_information` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `roles_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_personal_information_roles1_idx` (`roles_id`),
  CONSTRAINT `fk_personal_information_roles1` FOREIGN KEY (`roles_id`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_information`
--

LOCK TABLES `personal_information` WRITE;
/*!40000 ALTER TABLE `personal_information` DISABLE KEYS */;
INSERT INTO `personal_information` VALUES (1,'Matthew Smith','smithm43@seattleu.edu',NULL,NULL,2);
/*!40000 ALTER TABLE `personal_information` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `personal_information_id` int(11) NOT NULL,
  `status_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_request_personal_information1_idx` (`personal_information_id`),
  KEY `fk_request_status1_idx` (`status_id`),
  CONSTRAINT `fk_request_personal_information1` FOREIGN KEY (`personal_information_id`) REFERENCES `personal_information` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_request_status1` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request`
--

LOCK TABLES `request` WRITE;
/*!40000 ALTER TABLE `request` DISABLE KEYS */;
INSERT INTO `request` VALUES (1,'2016-12-17','2016-12-19',1,3),(2,'2016-12-12','2016-12-15',1,5);
/*!40000 ALTER TABLE `request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserved_item`
--

DROP TABLE IF EXISTS `reserved_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reserved_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quantity` int(11) DEFAULT NULL,
  `request_id` int(11) NOT NULL,
  `gear_item_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reserved_item_request1_idx` (`request_id`),
  KEY `fk_reserved_item_gear_item1_idx` (`gear_item_id`),
  CONSTRAINT `fk_reserved_item_gear_item1` FOREIGN KEY (`gear_item_id`) REFERENCES `gear_item` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_reserved_item_request1` FOREIGN KEY (`request_id`) REFERENCES `request` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserved_item`
--

LOCK TABLES `reserved_item` WRITE;
/*!40000 ALTER TABLE `reserved_item` DISABLE KEYS */;
INSERT INTO `reserved_item` VALUES (1,4,1,2),(2,10,1,14),(3,8,1,53),(4,2,1,55),(5,2,2,20),(6,3,2,22),(7,1,2,56),(8,2,2,9),(9,6,2,14);
/*!40000 ALTER TABLE `reserved_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'User'),(2,'Admin');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `size`
--

DROP TABLE IF EXISTS `size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `size` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size`
--

LOCK TABLES `size` WRITE;
/*!40000 ALTER TABLE `size` DISABLE KEYS */;
INSERT INTO `size` VALUES (1,'S'),(2,'M'),(3,'L'),(4,'XL'),(5,'XXL'),(6,'4.0'),(7,'4.5'),(8,'5.0'),(9,'5.5'),(10,'6.0'),(11,'6.5'),(12,'7.0'),(13,'7.5'),(14,'8.0'),(15,'8.5'),(16,'9.0'),(17,'9.5'),(18,'10.0'),(19,'10.5'),(20,'11.0'),(21,'11.5'),(22,'12.0'),(23,'13.0'),(24,'14.0'),(25,'N/A'),(26,'One size fits all'),(27,'Short'),(28,'Regular'),(29,'Long'),(30,'2 Person'),(31,'4 Person');
/*!40000 ALTER TABLE `size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `request_status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Started'),(2,'Deleted'),(3,'Submitted'),(4,'Under Review'),(5,'Approved'),(6,'Rejected'),(7,'Picked Up'),(8,'Complete'),(9,'Incomplete'),(10,'Paid');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-23 17:30:30
