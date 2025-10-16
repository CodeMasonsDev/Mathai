import { Feedback, feedbackProps, GeneratedProblem } from "@/types/types";
import axiosInstance from "./axiosInstance";

export async function fetchWorldProblem(): Promise<GeneratedProblem> {
  try {
    const response = await axiosInstance.get<GeneratedProblem>(
      "/generate-world-problem"
    );

    if (!response.data) {
      throw new Error("Empty response recieved from server");
    }
    return response.data;
  } catch (error) {
    console.error("❌ Error generating world problem:", error);

    throw new Error(
      "Failed to generate a new math problem. Please try again later."
    );
  }
}

export async function fetchFeedback({
  problem_id,
  student_answer,
}: feedbackProps): Promise<Feedback> {
  try {
    const response = await axiosInstance.post<Feedback>("/generate-feedback/", {
      problem_id,
      student_answer,
    });

    if (!response.data) {
      throw new Error("Empty response recieved from server");
    }

    return response.data;
  } catch (error) {
    console.error("❌ Error generating  fetching:", error);
    throw new Error("Failed to fetch feedback. Please try again later.");
  }
}
