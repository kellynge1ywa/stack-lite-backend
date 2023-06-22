CREATE OR ALTER  PROCEDURE GetAllUser
(
	@User_id VARCHAR(100),
	@Fullname VARCHAR(100),
	@Email VARCHAR(100),
	@Username VARCHAR(100),
	@User_Password VARCHAR(100),
	@User_role INT DEFAULT 0,
	@Email_sent INT DEFAULT 0,
	@Reset_password INT DEFAULT 0,
	@Deleted INT DEFAULT 0
)
AS
BEGIN

SELECT * FROM users.user_table WHERE Deleted=0;

END