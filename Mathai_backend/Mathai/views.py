from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .Agents.agent import generateWorldProblem,generateFeedback

@api_view(["GET"])
def routes(request):
    routes = [
        "generate-world-problem/",
        "generate-feedback/"
    ]
    return Response(routes)

@api_view(["GET"])
def generate_problem_solution(request):
    data = generateWorldProblem()
    return Response(data,status=status.HTTP_200_OK)

@api_view(["POST"])
def generate_feedback(request):
    data = request.data

    problemSession_id = data.get("problem_id") 
    student_answer = data.get("student_answer")

    result = generateFeedback(problemSession_id,student_answer)
    
    return Response(result, status=status.HTTP_200_OK)

