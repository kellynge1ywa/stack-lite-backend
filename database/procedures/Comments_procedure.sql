CREATE PROCEDURE commentsProcedure(@Comment_id VARCHAR(100),@User_id VARCHAR(100),@Comments VARCHAR(100))

AS
BEGIN
INSERT INTO comments.comment_table(Comment_id,User_id,Comments) 
VALUES(@Comment_id,@User_id, @Comments)

END