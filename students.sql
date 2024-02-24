-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 27, 2023 at 04:34 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `practice`
--

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL,
  `password` varchar(300) DEFAULT NULL,
  `studentId` varchar(20) DEFAULT NULL,
  `batchId` varchar(15) DEFAULT NULL,
  `mobileNo` varchar(15) DEFAULT NULL,
  `profilePic` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `email`, `password`, `studentId`, `batchId`, `mobileNo`, `profilePic`) VALUES
(83, 'Yuvraj Singh', 'yuvi@gmail.com', '$2b$10$acBaIvbOimxKh/BaiIipCegOmXdbBFjUfBv.Gz48NgPjL9kuUEr.m', '4', 'IND40', '9909909900', 'uploads/1681801209483-yuvi.jpg'),
(84, 'Zaheer Khan', 'khan@gmail.com', '$2b$10$s.eaVKLwJbtczzVNxQ.BFu3n.WrcPrW/9Yfk5b4dpbZCLid7udEYu', '5', 'IND30', '9708887744', 'uploads/1681802853520-zaheerrr.jpg'),
(85, 'Virender Sehwag', 'viru@gmail.com', '$2b$10$0WQzMtHK95tmsNifTRxOWuLQ.CVsqE7PkJ7tozzWBxUgkb/2txh8K', '6', 'IND30', '9990999099', 'uploads/1681803028819-viru.jpg'),
(86, 'Gautam Gambhir', 'gambir@gmail.com', '$2b$10$87Wo2yKjcl/o434xiPJiZOh8d8WJ/SGK29wPF3bbfoHJ9GccD3MIu', '7', 'IND30', '9990999099', 'uploads/1681803209776-gambir.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
