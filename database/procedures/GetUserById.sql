CREATE OR ALTER PROCEDURE GetUserById(@User_id VARCHAR(100))
AS
BEGIN
SELECT * FROM users.user_table  WHERE @User_id=@User_id AND Deleted=0

END