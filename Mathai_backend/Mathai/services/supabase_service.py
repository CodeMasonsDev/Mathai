import os
from dotenv import load_dotenv

from supabase import create_client,Client    
load_dotenv()

url:str  = os.environ.get("SUPABASE_URL")
key:str = os.environ.get("SUPABASE_KEY")

supabase: Client= create_client(url,key)



def get_world_problem(session_id):
    res = supabase.table("math_problem_sessions").select("id,problem_text,correct_answer").eq("id",session_id).execute()
    return res.data


def save_generatedProblem(problem:str,solution:str):
    data  = {
        "problem_text":problem,
        "correct_answer":solution
    }

    res = supabase.table("math_problem_sessions").insert(data).execute();

    if res.data and len(res.data) > 0:
        inserted_row = res.data[0]
        return inserted_row["id"]
    else:
        return None


def save_feedback(session_id,user_answer,is_correct,feedback):
    data = {
        "session_id": session_id,
        "user_answer": user_answer,
        "is_correct": is_correct,
        "feedback_text":feedback
    }

    res = supabase.table("math_problem_submissions").insert(data).execute()

    return res.data