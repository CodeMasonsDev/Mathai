"use client";
import HistoryCard from "@/components/cards/history-card";
import { useHistoryData } from "@/context/HistoryContext";
import { useEffect } from "react";

function History() {
  const { records, fetchRecords } = useHistoryData();
  // useEffect(() => {
  //   fetchRecords();
  // }, []);
  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <main className="w-full max-w-7xl px-4 sm:px-6 py-8 flex flex-col gap-8">
        <section>
          <h1 className="text-3xl sm:text-4xl font-bold">Problem History</h1>
          <p className="text-gray-600 mt-1">
            Review your progress and see how you've improved over time.
          </p>
        </section>

        <section className="bg-white shadow-md rounded-xl overflow-hidden">
          {/* Header only visible on desktop */}
          <header className="hidden md:block bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-8 text-gray-700 font-semibold py-4 px-4 gap-10">
              <p className="col-span-3">Problem</p>
              <p>Your Answer</p>
              <p>Result</p>
              <p>AI Feedback</p>
            </div>
          </header>

          {!records ? (
            <p>loading...</p>
          ) : (
            <section className="overflow-y-auto max-h-[550px] divide-y">
              <HistoryCard records={records ?? []} />
            </section>
          )}
        </section>
      </main>
    </div>
  );
}

export default History;
