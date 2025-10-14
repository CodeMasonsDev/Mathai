import os
import random
from dotenv import load_dotenv
from langchain_core.prompts import PromptTemplate
from langchain_core.messages import HumanMessage,SystemMessage
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from .structured_outputs import MathProblem,FeedbackResponse
from .topics import topics
from .prompts import generateWorldProblemPrompt,generateFeedbackPrompt

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

MODEL = os.getenv("MODEL")

llm = ChatOpenAI(model=MODEL)

def generateWorldProblem():
    
    problem_prompt = ChatPromptTemplate.from_messages([
            SystemMessage(content=generateWorldProblemPrompt),
            HumanMessage(content=""" Create a Grade 5 real-world math problem about: {topic} """)
            ])
    
    structured_output = llm.with_structured_output(MathProblem)
    
    generate_problem_chain = problem_prompt | structured_output
    
    topic = random.choice(topics)
    
    result = generate_problem_chain.invoke({ "topic": topic})
    
    return result

def generateFeedback(problem: str, solution: str, student_answer: str):

    structured_feedback = llm.with_structured_output(FeedbackResponse)     
    
    prompt_template = PromptTemplate.from_template(generateFeedbackPrompt)

    generate_feedback_chain = prompt_template | structured_feedback

    feedback = generate_feedback_chain.invoke({
        "problem": problem,
        "solution": str(solution),
        "student_answer": str(student_answer)
    })

    return feedback