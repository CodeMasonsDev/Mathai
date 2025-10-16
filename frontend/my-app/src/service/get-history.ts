import { getRecords } from "@/api/get-records";
import { Records } from "@/types/types";

export async function getHistory(): Promise<Records[]> {
  const res = await getRecords();
  return res;
}
