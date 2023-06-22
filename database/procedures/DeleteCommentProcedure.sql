CREATE OR ALTER PROCEDURE delete_comment @Comment_id varchar(100)
	
	

AS
BEGIN
UPDATE comments.comment_table SET Deleted=1 WHERE Comment_id=@Comment_id 

	
END