import { fetchFeedback } from "@/api/agent";
import { Feedback, feedbackProps } from "@/types/types";

export async function submitAnswer({
  problem_id,
  student_answer,
}: feedbackProps): Promise<Feedback> {
  if (!problem_id || !student_answer) {
    throw new Error("Problem id and asnwer are required!");
  }

  try {
    const res = await fetchFeedback({ problem_id, student_answer });
    if (!res) {
      throw new Error("Empty response. Please try again");
    }
    return res;
  } catch (error) {
    console.log("Submit answer failed to send data", error);
    throw new Error("Unable to submit your answer. Please try again");
  }
}
