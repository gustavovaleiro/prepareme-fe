import { useTranslation } from 'react-i18next';
import type { Question, Answer, Feedback } from '../../../types/interview';
import { FeedbackHeader } from './FeedbackHeader';
import { FeedbackCard } from './FeedbackCard';

interface QuestionFeedback {
  question: Question;
  answer: Answer;
  feedback: Feedback;
}

interface Props {
  questions: QuestionFeedback[];
}

export function FeedbackDisplay({ questions }: Props) {
  const { t } = useTranslation();
  const averageNote = questions.reduce((acc, q) => acc + q.feedback.note, 0) / questions.length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <FeedbackHeader 
        averageNote={averageNote} 
        totalQuestions={questions.length} 
      />

      <div className="space-y-8">
        {questions.map((item, index) => (
          <FeedbackCard
            key={item.question.id}
            index={index}
            question={item.question}
            answer={item.answer}
            feedback={item.feedback}
          />
        ))}
      </div>
    </div>
  );
}