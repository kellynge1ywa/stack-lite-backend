CREATE OR ALTER PROCEDURE getAllQuestions(
	@Question_id VARCHAR(100),
	@User_id VARCHAR(100),
	@Questions VARCHAR(100),
	@Tags VARCHAR(100),
	@Body VARCHAR(1000))

AS
BEGIN
SELECT * FROM questions.question_table WHERE Deleted=0

END