import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../features/quiz/quizSlice';
import QuestionCard from '../components/QuestionCard';
import Result from '../components/Result';
import { RootState } from '../redux/store';

const QuizPage: React.FC = () => {
  const dispatch = useDispatch();
  const { questions, currentQuestionIndex, score, showResult } = useSelector((state: RootState) => state.quiz);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <div className="quiz-page">
      {showResult ? <Result score={score} /> : <QuestionCard question={questions[currentQuestionIndex]} />}
    </div>
  );
};

export default QuizPage;