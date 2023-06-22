CREATE PROCEDURE rolesProcedure(@Role_id VARCHAR(100),@User_id VARCHAR(100),@Email VARCHAR(100),@User_role VARCHAR(100))

AS
BEGIN
INSERT INTO users.user_role(Role_id,User_id,Email,User_role) 
VALUES(@Role_id,@User_id, @Email,@User_role)

END