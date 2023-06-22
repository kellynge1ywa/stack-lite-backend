CREATE PROCEDURE questionsUser(@Question_id VARCHAR(100),@User_id VARCHAR(100),@Question VARCHAR(100),@Tags VARCHAR(100),@Body VARCHAR(100))

AS
BEGIN
UPDATE questions.question_table SET Question_id=@Question_id, User_id=@User_id,Question=@Question, Tags=@Tags,Body=@Body WHERE Question_id=@Question_id AND DELETED=0


END