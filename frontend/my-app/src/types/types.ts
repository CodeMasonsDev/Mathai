export type feedbackProps = {
  problem_id: string;
  student_answer: string;
};

export interface GeneratedProblem {
  id: number;
  Problem: string;
  Solution: string;
}

export type Feedback = {
  problem: string;
  solution: string;
  student_answer: string;
  is_correct: string;
  feedback_message: string;
};

export type Records = {
  problem: string;
  solution: string;
  user_answer: string;
  is_correct: string;
  feedback_text: string;
};

export interface HistoryCardProps {
  records: Records[] | null;
}
