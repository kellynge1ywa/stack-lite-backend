CREATE OR ALTER PROCEDURE getOneQuestion @Question_id varchar(100)
	

AS
BEGIN
SELECT * FROM questions.question_table WHERE Question_id=@Question_id AND  Deleted=0

END