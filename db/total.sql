CREATE TABLE `cfhandles` (
    `username` varchar(100) NOT NULL,
    `handle` varchar(100) NOT NULL 
);


CREATE TABLE `comments` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `author` varchar(100) NOT NULL,
    `content` TEXT NOT NULL,
    `time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `parent` INT NOT NULL
);

CREATE TABLE `logininfo` (
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `userType` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `logininfo`
--
ALTER TABLE `logininfo`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);
COMMIT;



CREATE TABLE `mentor` (
  `username` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phoneNo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mentor`
--
ALTER TABLE `mentor`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `username` (`username`);
COMMIT;

CREATE TABLE `nationalcontests` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(200) NOT NULL ,
    `time` DATE NOT NULL
);


CREATE TABLE `posts` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `author` varchar(100) NOT NULL,
    `title` varchar(200) NOT NULL ,
    `content` TEXT NOT NULL,
    `time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




CREATE TABLE `practicecontests` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(200) NOT NULL ,
    `nationalcontest` INT NOT NULL,
    `link` VARCHAR(300) NOT NULL
);


CREATE TABLE `replies` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `author` varchar(100) NOT NULL,
    `content` TEXT NOT NULL,
    `time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `parent` INT NOT NULL
);


CREATE TABLE `student` (
  `username` varchar(100) NOT NULL,
  `regNo` int(18) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phoneNo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`username`);
COMMIT;



CREATE TABLE `student` (
  `username` varchar(100) NOT NULL,
  `regNo` int(18) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phoneNo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`username`);
COMMIT;


CREATE TABLE `teams` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(200) NOT NULL ,
    `member1` varchar(200) NOT NULL,
    `member2`varchar(200) NOT NULL,
    `member3`varchar(200) NOT NULL,
    `coach`varchar(200) NOT NULL,
    `contest`INT NOT NULL
);



