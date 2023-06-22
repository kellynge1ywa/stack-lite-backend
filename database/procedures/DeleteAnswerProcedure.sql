CREATE OR ALTER PROCEDURE delete_answer @Answer_id varchar(100)
	
	

AS
BEGIN
UPDATE answers.answers_table SET Deleted=1 WHERE Answer_id=@Answer_id

	
END