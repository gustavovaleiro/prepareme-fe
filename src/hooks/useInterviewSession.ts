import { useState } from 'react';
import type { Question, InterviewSession } from '../types';

export function useInterviewSession(initialQuestions: Question[]) {
  const [session, setSession] = useState<InterviewSession>({
    questions: initialQuestions,
    currentQuestionIndex: 0,
    answers: [],
  });

  const submitAnswer = (answer: string) => {
    setSession((prev) => {
      const newAnswers = [
        ...prev.answers,
        {
          questionId: prev.questions[prev.currentQuestionIndex].id,
          text: answer,
        },
      ];

      return {
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        answers: newAnswers,
      };
    });
  };

  const isComplete = session.currentQuestionIndex >= session.questions.length;
  const currentQuestion = session.questions[session.currentQuestionIndex];

  return {
    currentQuestion,
    submitAnswer,
    isComplete,
    answers: session.answers,
  };
}