SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

DROP DATABASE if exists `tharaka_fyp`;


-- CREATE DATABASE if not exists `salon_db`;

CREATE DATABASE `tharaka_fyp`;

USE tharka_fyp;

CREATE TABLE if not exists frame_identification(
`video_id` int(11) NOT NULL auto_increment,
`video_name` varchar (100),
`video_url` varchar (100),
`start_time` varchar (50),
`end_time` varchar (50),
`violence_type` varchar (50),
`violence_mode` varchar (50),

PRIMARY KEY  (`video_id`)

)ENGINE = InnoDB;