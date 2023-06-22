CREATE PROCEDURE updateUser(@User_id varchar(50),@Fullname varchar(50),@Email varchar(50),@Username varchar(50),@User_password varchar(100))

AS
BEGIN
INSERT INTO users.user_table(User_id,Fullname,Email,Username,User_password) 
VALUES(@User_id, @Fullname,@Email,@Username, @User_password)

END