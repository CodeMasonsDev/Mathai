"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Feedback, Records } from "@/types/types";
import { getHistory } from "@/service/get-history";

const HistoryContext = createContext<any>(null);

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [records, setRecords] = useState<Records[] | null>(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await getHistory();
        console.log("records", res);
        setRecords(res);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchRecords();
  }, []);

  function addRecords(newRecord: Feedback) {
    const mappedRecord: Records = {
      problem: newRecord.problem,
      solution: newRecord.solution,
      user_answer: newRecord.student_answer,
      is_correct: newRecord.is_correct,
      feedback_text: newRecord.feedback_message,
    };

    setRecords((prev) => [mappedRecord, ...(prev ?? [])]);

    console.log("Succesfully added");
  }

  return (
    <HistoryContext.Provider value={{ records, addRecords }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistoryData() {
  return useContext(HistoryContext);
}
