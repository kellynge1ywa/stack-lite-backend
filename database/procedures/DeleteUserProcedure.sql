CREATE or ALTER PROCEDURE delete_user(@User_id varchar(100) )

AS
BEGIN
UPDATE users.user_table SET Deleted=1 WHERE User_id=@User_id 

END