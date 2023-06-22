CREATE OR ALTER PROCEDURE getAllAnswers(
	@Answer_id VARCHAR(100),
	@User_id VARCHAR(100),
	@Answers VARCHAR(100))
	

AS
BEGIN
SELECT * FROM answers.answers_table WHERE Deleted=0

END