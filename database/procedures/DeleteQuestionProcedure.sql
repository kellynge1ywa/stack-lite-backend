CREATE OR ALTER PROCEDURE delete_question @Question_id varchar(100)
	
	

AS
BEGIN
UPDATE questions.question_table SET Deleted=1 WHERE Question_id=@Question_id 

	
END