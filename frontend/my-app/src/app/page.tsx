"use client";
import IconLabelButtons from "@/components/ui/button";
import { submitAnswer } from "@/service/generate-feedback";
import { generateProblem } from "@/service/generate-world-problem";
import { Feedback, GeneratedProblem } from "@/types/types";
import { useState } from "react";
import LightbulbOutlineIcon from "@mui/icons-material/LightbulbOutline";
import QuizIcon from "@mui/icons-material/Quiz";
import Input from "@/components/ui/input";
import { useHistoryData } from "@/context/HistoryContext";

export default function Home() {
  const [generatedProblem, setGeneratedProblem] =
    useState<GeneratedProblem | null>(null);
  const [generatedFeedback, setGeneratedFeedback] = useState<Feedback | null>(
    null
  );
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  // useEffect(() => {
  //   handleGenerateProblem();
  // }, []);
  const { addRecords } = useHistoryData();

  async function handleGenerateProblem(): Promise<void> {
    try {
      setGeneratedProblem(null);
      setGeneratedFeedback(null);
      setLoading(true);
      const res = await generateProblem();
      console.log("response:", res);
      setGeneratedProblem(res);
    } catch (error) {
      console.log("Failed to generate problem");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitAnswer(
    problem_id: string,
    student_answer: string
  ): Promise<void> {
    setGeneratedFeedback(null);
    setLoading2(true);
    try {
      const res = await submitAnswer({ problem_id, student_answer });
      setGeneratedFeedback(res);
      console.log("feedback", res);
      addRecords(res);
    } catch (error) {
      console.log("Failed to submit");
    } finally {
      setLoading2(false);
      setAnswer("");
    }
  }

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 px-4 sm:px-6 md:px-10">
      <main className="w-full max-w-4xl py-10 flex flex-col gap-8 md:gap-10">
        {/* Header */}
        <section className="flex flex-col justify-center items-center text-center gap-5 mt-4">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-teal-400">
            Math World Problem Generator
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl">
            Sharpen your math skills with AI-powered world problems tailored
            just for you.
          </p>
        </section>

        {/* Generate Button */}
        <section className="flex justify-center">
          <IconLabelButtons
            name="Generate New Problem"
            onGenerate={handleGenerateProblem}
          />
        </section>

        {/* Generated Problem */}
        <section className="bg-white shadow rounded-2xl p-5 w-full">
          <div className="flex items-center gap-3 mb-3">
            <QuizIcon className="text-[#375dfc]" />
            <h1 className="font-bold text-xl sm:text-2xl">Generated Problem</h1>
          </div>

          {loading && <p className="text-gray-500 text-sm">Generating...</p>}

          {!generatedProblem && !loading && (
            <p className="text-gray-400 text-sm italic text-center py-6">
              👋 Click the{" "}
              <span className="font-medium text-[#375dfc]">
                "Generate Problem"
              </span>{" "}
              button to start!
            </p>
          )}

          {generatedProblem && (
            <div className="flex items-center justify-center p-8 text-gray-500 text-base leading-relaxed">
              <p> "{generatedProblem.Problem}"</p>
            </div>
          )}
        </section>

        {/* Answer Input + Submit */}
        <section className="w-full bg-white p-5 shadow-lg rounded-2xl">
          <div className="flex flex-col md:flex-row items-center w-full gap-3">
            <Input
              type="text"
              placeholder="Enter your answer..."
              className="w-full md:flex-1 h-[60px] px-5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-base md:text-lg"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button
              className="w-full md:w-auto md:px-10 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold py-3 rounded-full shadow-md hover:opacity-90 transition text-base md:text-lg"
              onClick={() =>
                handleSubmitAnswer(String(generatedProblem?.id), answer)
              }
            >
              Submit Answer
            </button>
          </div>
        </section>

        {/* Feedback Section */}
        <section className="bg-white p-5 shadow rounded-2xl">
          <div className="flex items-center gap-2 mb-3">
            <LightbulbOutlineIcon className="text-red-500" />
            <h1 className="font-bold text-xl sm:text-2xl">AI Feedback</h1>
          </div>
          {loading2 && <p className="text-gray-500 text-sm">Checking...</p>}

          {generatedFeedback && (
            <div
              className={`p-4 rounded-2xl border-l-4 ${
                generatedFeedback.is_correct
                  ? "bg-green-50 border-l-green-500"
                  : "bg-red-50 border-l-red-500"
              }`}
            >
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {generatedFeedback.feedback_message}
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
