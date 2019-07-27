USE FoodCoop;

insert into Customer values ('1', 'Jim', 'Moore', '123 This Street', 'None', 'Lucinda', 'PA', '16235');
insert into Customer values ('2', 'Tim', 'Strickler', '123 This Street', 'None', 'Butler', 'PA', '15643');
insert into Customer values ('3', 'Lee', 'Jordan', '123 This Street', 'None', 'Mars', 'PA', '15343');
insert into Customer values ('4', 'Levron', 'James', '123 Downtown Street', 'None', 'Pittsburgh', 'PA', '15224');

insert into Vendor values ('1', 'Terry', 'Moore', '523 Other Street', 'None', 'Lucinda', 'PA', '16235');
insert into Vendor values ('2', 'Levi', 'Mast', '7123 Other Street', 'None', 'Venus', 'PA', '16231');
insert into Vendor values ('3', 'Joe', 'King', '3123 Other Street', 'None', 'Butler', 'PA', '15643');
insert into Vendor values ('4', 'Vincent', 'James', '6123 Other Street', 'None', 'Mars', 'PA', '15343');

insert into product values ('1', 'Carrots', 'Carrots', 'They are carrots', '3.00', '1', '0', '1');
insert into product values ('2', 'Potato', 'Potato', 'They are Potatos', '6.50', '1', '0', '1');
insert into product values ('3', 'Cheddar Cheese', 'Cheddar Cheese', 'It is cheese.', '12.99', '1', '0', '2');
insert into product values ('4', 'Strawberry Jam', 'Strawberry Jam', 'Made from freshly grown strawberry.', '4.95', '1', '0', '3');
insert into product values ('5', 'Rolled Oats', 'Rolled Oats', 'Just picked.', '2.00', '1', '0', '4');
insert into product values ('6', 'Pickled Bolgana', 'Pickled', 'Two year old meat.', '7.25', '0', '0', '2');

insert into PurchaseHistory values ('1', '1', '1', '2', '2019-07-26');
insert into PurchaseHistory values ('2', '1', '2', '2', '2019-07-26');
insert into PurchaseHistory values ('3', '3', '4', '1', '2019-07-26');
insert into PurchaseHistory values ('4', '4', '5', '4', '2019-07-26');

insert into CustReview values ('1', '2', '1', '', '2019-07-26', '3.5');
insert into CustReview values ('2', '4', '2', '', '2019-07-26', '4');
insert into CustReview values ('3', '5', '2', '', '2019-07-26', '2');

insert into CustomerSearchHistory values ('1', '1', 'cheese', '2019-07-26');
insert into CustomerSearchHistory values ('2', '4', 'oats', '2019-07-26');
