from pydantic import BaseModel,Field

class MathProblem(BaseModel):
    """
      Real World Problem about Math and its solution
    """
    Problem:str = Field(description="The Real world Problem")
    Solution:str = Field(description="The solution of the Problem")
    
class FeedbackResponse(BaseModel):
        """
         Feedback generator
        """
        problem: str = Field(description="The original math problem")
        solution: str = Field(description="The correct numeric solution")
        student_answer: float = Field(description="The student's numeric answer")
        is_correct: bool = Field(description="True if student's answer is correct")
        feedback_message: str = Field(description="Short feedback message")
