CREATE OR ALTER  PROCEDURE getOneAnswer @Answer_id varchar(100)
	

AS
BEGIN
SELECT * FROM answers.answer_table WHERE Answer_id=@Answer_id AND Deleted=0

END