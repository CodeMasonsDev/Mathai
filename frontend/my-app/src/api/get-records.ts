import { Records } from "@/types/types";
import axiosInstance from "./axiosInstance";

// get all the records of the generated problems with its feedback
export async function getRecords(): Promise<Records[]> {
  try {
    const res = await axiosInstance.get<Records[]>("get-all-records");
    if (!res.data) {
      throw new Error("Empty response. Please try again");
    }
    return res.data;
  } catch (error) {
    console.log("Error fetching records. Please try again", error);
    throw new Error(
      "Failed to fetch all records from the database. Please try again"
    );
  }
}
