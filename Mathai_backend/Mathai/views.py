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
    json_result = data.model_dump()
    return Response(json_result,status=status.HTTP_200_OK)


@api_view(["POST"])
def generate_feedback(request):
    data = request.data
    problem = data.get("problem")
    solution = data.get("solution")
    student_answer = data.get("student_answer")

    feedback_dict = generateFeedback(problem, solution, student_answer)
    json_result = feedback_dict.model_dump()
    return Response(json_result, status=status.HTTP_200_OK)

