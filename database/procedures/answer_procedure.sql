CREATE PROCEDURE answersProcedure(@Answer_id VARCHAR(100),@User_id VARCHAR(100),@Answers VARCHAR(100))

AS
BEGIN
INSERT INTO answers.answers_table(Answer_id,User_id,Answers) 
VALUES(@Answer_id,@User_id, @Answers)

END