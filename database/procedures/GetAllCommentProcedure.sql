CREATE OR ALTER PROCEDURE getAllComments(
	@Comment_id VARCHAR(100),
	@User_id VARCHAR(100),
	@Comments VARCHAR(100))
	

AS
BEGIN
SELECT * FROM comments.comment_table WHERE Deleted=0

END