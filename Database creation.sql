CREATE TABLE Plans (
ID int NOT NULL,
CODE varchar(150),
QTE int,
CA int,
ART int,
GRPART int,
PALIER int,
REMISE int,
AVS int,
GRATUITE int,
GIFT int,
SOUSCONDITION int,
TOTAL int,
PRIMARY KEY (ID)
); 

CREATE TABLE Paliers (
ID int NOT NULL,
CODE varchar(150),	
NbrPalier int,	
DE	int,
A int
);

	
CREATE TABLE ArticlesCondition (
ID int NOT NULL,
CODE varchar(150),
CODEX3 varchar(250),
DESIGNATION varchar(300)
);




CREATE TABLE SousConditionPaliers (
ID int NOT NULL,
CODE varchar(150),	
NbrPalier int,
CODEX3 varchar(250),
DETAILS	varchar(150),
MINNOMBRE int
);




CREATE TABLE Offre (
ID int NOT NULL,
CODE varchar(150),	
NbrPalier int,
OFFRE varchar(150),
DETAILS int
);
