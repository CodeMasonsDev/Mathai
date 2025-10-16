import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { HistoryCardProps } from "@/types/types";

function HistoryCard({ records }: HistoryCardProps) {
  if (!records || records.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">No records found.</div>
    );
  }
  return (
    <section className="overflow-y-auto max-h-[550px] divide-y">
      {records.map((record: any, index) => (
        <div
          className="w-full bg-white shadow-sm py-4 px-4 border-b-1 border-gray-100 hover:shadow-md transition"
          key={index}
        >
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-8 md:gap-10">
            <p className="col-span-3 text-gray-500 text-sm break-words">
              {record.problem}
            </p>
            <p className="text-gray-700 text-sm break-words">
              {record.user_answer}
            </p>

            <div className="flex items-center text-sm">
              <p
                className={`flex items-center gap-2 p-2 rounded ${
                  record.is_correct ? "text-green-500" : "text-red-500"
                }`}
              >
                <CheckCircleOutlineIcon fontSize="small" />
                {record.is_correct ? "Correct" : "Incorrect"}
              </p>
            </div>

            <p className="col-span-3 text-gray-500 text-sm break-words">
              {record.feedback_text}
            </p>
          </div>

          {/* Mobile Layout */}
          <div className="flex flex-col gap-2 md:hidden text-gray-500 text-sm">
            <p>
              <span className="font-semibold">Problem:</span> {record.problem}
            </p>
            <p>
              <span className="font-semibold">Your Answer:</span>{" "}
              {record.user_answer}
            </p>
            <p
              className={`font-semibold ${
                record.is_correct ? "text-green-500" : "text-red-500"
              } flex items-center gap-2`}
            >
              <CheckCircleOutlineIcon fontSize="small" />
              {record.is_correct ? "Correct" : "Incorrect"}
            </p>
            <p>
              <span className="font-semibold">Feedback:</span>{" "}
              {record.feedback_text}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default HistoryCard;
