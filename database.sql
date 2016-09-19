create database solyos_xpto default collate "utf8_general_ci" character set "utf8";
use solyos_xpto;

/* structure */
create table users (
  id int(10) unsigned not null auto_increment primary key,
  username varchar(40) not null,
  password char(40) not null,
  createdAt timestamp null,
  updatedAt timestamp null
);

create table customers (
  id int(10) unsigned not null auto_increment primary key,
  name varchar(120) not null,
  birth date null,
  federalId varchar(11) not null unique,
  email varchar(120) not null unique,
  phone varchar(11) not null,
  enabled tinyint(1) not null default 1,
  createdAt timestamp null,
  updatedAt timestamp null
);

/* seed */
insert into users (username, password) values ('xpto', '1b6265d9c26ca85e58ca870aa01342fbdfc9c1b8');