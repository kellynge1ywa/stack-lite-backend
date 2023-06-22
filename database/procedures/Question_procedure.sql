CREATE PROCEDURE questionsUser(@Question_id VARCHAR(100),@User_id VARCHAR(100),@Question VARCHAR(100),@Tags VARCHAR(100),@Body VARCHAR(100))

AS
BEGIN
INSERT INTO questions.question_table(Question_id,User_id,Question,Tags,Body) 
VALUES(@Question_id,@User_id, @Question,@Tags,@Body)

END