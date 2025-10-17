import { Feedback, feedbackProps, GeneratedProblem } from "@/types/types";
import axiosInstance from "./axiosInstance";

// fetch genarated world problem
export async function fetchWorldProblem(): Promise<GeneratedProblem> {
  try {
    console.log("Generating world problem...");

    const response = await axiosInstance.get<GeneratedProblem>(
      "/generate-world-problem"
    );

    if (!response.data) {
      console.log("Empty response");

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

// get a feedback from student's asnwer
export async function fetchFeedback({
  problem_id,
  student_answer,
}: feedbackProps): Promise<Feedback> {
  try {
    console.log("Generating feedback...");

    const response = await axiosInstance.post<Feedback>("/generate-feedback/", {
      problem_id,
      student_answer,
    });

    if (!response.data) {
      console.log("Empty response");

      throw new Error("Empty response recieved from server");
    }

    return response.data;
  } catch (error) {
    console.error("❌ Error generating  fetching:", error);
    throw new Error("Failed to fetch feedback. Please try again later.");
  }
}
