CREATE OR ALTER  PROCEDURE getOneComment @Comment_id varchar(100)
	

AS
BEGIN
SELECT * FROM comments.comment_table WHERE Comment_id=@Comment_id AND Deleted=0

END