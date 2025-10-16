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
from ..services.supabase_service import save_feedback ,save_generatedProblem,get_world_problem


load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

MODEL = os.getenv("MODEL")

# for openai MODEL = "gpt-4o-mini"
# llm = ChatOpenAI(model=MODEL)

# for llama LLM 
llm = ChatOpenAI(
    model=MODEL,
    base_url="https://openrouter.ai/api/v1",  
    api_key=OPENAI_API_KEY
) 

def generateWorldProblem():
    
    problem_prompt = ChatPromptTemplate.from_messages([
            SystemMessage(content=generateWorldProblemPrompt),
            HumanMessage(content=""" Create a Grade 5 real-world math problem about: {topic} """)
            ])
    
    structured_output = llm.with_structured_output(MathProblem)
    
    generate_problem_chain = problem_prompt | structured_output
    
    topic = random.choice(topics)
    
    result = generate_problem_chain.invoke({ "topic": topic})
    
    data = result.model_dump()

    save_id = save_generatedProblem(data["Problem"],data["Solution"])
    
    json_data = {
        "id": save_id,
        "Problem": data["Problem"],
        "Solution": data["Solution"]
    }
    return json_data

def generateFeedback(session_id:str,student_answer:str):

    structured_feedback = llm.with_structured_output(FeedbackResponse)     
    
    prompt_template = PromptTemplate.from_template(generateFeedbackPrompt)

    generate_feedback_chain = prompt_template | structured_feedback

    res = get_world_problem(session_id)
    problem = res[0]["problem_text"]
    solution = res[0]["correct_answer"]

    feedback = generate_feedback_chain.invoke({
        "problem": problem,
        "solution": str(solution),
        "student_answer": str(student_answer)
    })

    result  = feedback.model_dump()

    save_feedback(session_id,student_answer,result["is_correct"],result["feedback_message"])

    return result