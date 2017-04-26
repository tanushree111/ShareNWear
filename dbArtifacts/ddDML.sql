USE  `dbproj`;

-- Users

insert into Users(firstName,lastName,email,phone,username,password,address,dateCreated) values ('Adam','Adam','a.a@email.com','1234567890','adam','adam','440 Huntington Avenue',now());
insert into Users(firstName,lastName,email,phone,username,password,address,dateCreated) values ('Eve','Eve','e.e@email.com','1234567890','eve','eve','440 Huntington Avenue',now());
insert into Users(firstName,lastName,email,phone,username,password,address,dateCreated) values ('Andy','A','andy@email.com','1234567890','andy','andy','440 Huntington Avenue',now());
insert into Users(firstName,lastName,email,phone,username,password,address,dateCreated) values ('Bob','B','bob@email.com','1234567890','bob','bob','440 Huntington Avenue',now());
insert into Users(firstName,lastName,email,phone,username,password,address,dateCreated) values ('Charlie','C','charlie@email.com','1234567890','charlie','charlie','440 Huntington Avenue',now());
insert into Users(firstName,lastName,email,phone,username,password,address,userRole,dateCreated) values ('Admin','Admin','admin@email.com','1234567890','admin','admin','440 Huntington Avenue','ADMIN',now());

-- Products
insert into Products(name,description,category,size,extId) values ('Red Skirt-Straight','A straight cut knee length true red skirt','skirts','Medium','201877603152');
insert into Products(name,description,category,size,extId) values ('Ford Black Top','A fancy black knit top','top','Medium','132139191786');
insert into Products(name,description,category,size,extId) values ('Hi low Red Skirt','Hi low burgundy red skirt','skirts','Large','262911324289');
insert into Products(name,description,category,size,extId) values ('Red Skirt-Straight','A straight cut knee length true red skirt','skirts','Small','201877603152');
insert into Products(name,description,category,size,extId) values ('Skirt-Straight','Blue straight cut skirt','skirts','Small','382020532109');
insert into Products(name,description,category,size,extId) values ('Black skirt','Full length quintessential skirt in black','skirts','Large','252827268241');


-- Messages
insert into Messages(sender,receiver,byEmail,subject,description)  values (1,2,'t.h@email.com','Color enquiry','Do u have this in any other colour?');
insert into Messages(sender,receiver,byEmail,subject,description)  values (1,3,'t.h@email.com','Color enquiry','Do u have this in any other colour?');
insert into Messages(sender,receiver,byEmail,subject,description)  values (3,4,'b@email.com','Size enquiry','Do u have this in any other size?');
insert into Messages(sender,receiver,byEmail,subject,description)  values (4,1,'c@email.com','Color enquiry','Do u have this in any other colour?');
  
-- Likes
insert into Likes(likedBy,likes) values (1,2);
insert into Likes(likedBy,likes) values (3,1);
insert into Likes(likedBy,likes) values (4,1);
insert into Likes(likedBy,likes) values (2,3);
insert into Likes(likedBy,likes) values (5,1);

-- Follows
insert into Follows(followedBy,follows) values (1,5);
insert into Follows(followedBy,follows) values (3,2);
insert into Follows(followedBy,follows) values (4,1);
insert into Follows(followedBy,follows) values (1,3);
insert into Follows(followedBy,follows) values (5,1);

-- ProductsReviews
insert into ProductReviews(reviewer,productId,rating,title,description) values (2,1,4,'good product','liked it a lot');
insert into ProductReviews(reviewer,productId,rating,title) values (3,1,3,'ok ok');
insert into ProductReviews(reviewer,productId,rating,title) values (1,2,1,'bad');

-- UsersReviews
insert into UserReviews(reviewer,reviewFor,rating,title,description) values (4,2,5,'awesome','would like to rent again');
insert into UserReviews(reviewer,reviewFor,rating,title) values (2,1,3,'grt');
insert into UserReviews(reviewer,reviewFor,rating,title) values (2,3,3,'nice');
insert into UserReviews(reviewer,reviewFor,rating,title) values (1,5,3,'could be better');

-- Lendings
insert into Lendings(lender,productId,price,quantity,availableFrom,availableTo) values (1,1,10,1,now(),DATE_ADD(NOW(), INTERVAL 5 DAY));
insert into Lendings(lender,productId,price,quantity,availableFrom,availableTo) values (1,4,7,1,now(),DATE_ADD(NOW(), INTERVAL 7 DAY));
insert into Lendings(lender,productId,price,quantity,availableFrom,availableTo) values (2,1,9,1,now(),DATE_ADD(NOW(), INTERVAL 10 DAY));
insert into Lendings(lender,productId,price,quantity,availableFrom,availableTo) values (3,1,13,1,now(),DATE_ADD(NOW(), INTERVAL 3 DAY));


-- Rentals
insert into Rentals(lender,productId,renter,rentedQty,rentedFrom,rentedTo) values (1,1,5,1,now(),DATE_ADD(NOW(), INTERVAL 3 DAY));
insert into Rentals(lender,productId,renter,rentedQty,rentedFrom,rentedTo) values (1,4,3,1,now(),DATE_ADD(NOW(), INTERVAL 7 DAY));
