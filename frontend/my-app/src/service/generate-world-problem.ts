import { fetchWorldProblem } from "@/api/agent";

export async function generateProblem() {
  try {
    const res = await fetchWorldProblem();

    if (!res) {
      throw new Error("Empty response. Please try again");
    }

    return res;
  } catch (error) {
    console.log("Failed to generate Problem");
    throw new Error("Failed to generate problem");
  }
}
