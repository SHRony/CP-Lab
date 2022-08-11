CREATE TABLE `teams` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(200) NOT NULL ,
    `member1` INT NOT NULL,
    `member2`INT NOT NULL,
    `member3`INT NOT NULL,
    `coach`INT NOT NULL,
    `contest`INT NOT NULL
);