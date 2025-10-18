"use server";
import { Records } from "@/types/types";
import { unstable_cache } from "next/cache";

//cached the records
async function fetchRecords(): Promise<Records[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/get-all-records`,
    {
      next: {
        revalidate: 300,
      },
    }
  );

  const data = await res.json();

  if (!data) throw new Error("Empty response. Please try again");

  return data;
}

export const getRecords = unstable_cache(fetchRecords, ["records"], {
  revalidate: 300,
  tags: ["records"],
});
