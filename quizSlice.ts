import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Question } from '../../types/question';

export const fetchQuestions = createAsyncThunk('quiz/fetchQuestions', async () => {
  const res = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
  const data = await res.json();
  return data.results.map((q: any) => ({
    question: q.question,
    options: [...q.incorrect_answers, q.correct_answer].sort(),
    correct_answer: q.correct_answer,
  }));
});

interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  showResult: boolean;
}

const initialState: QuizState = {
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  showResult: false,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    nextQuestion(state) {
      if (state.currentQuestionIndex + 1 < state.questions.length) {
        state.currentQuestionIndex += 1;
      } else {
        state.showResult = true;
      }
    },
    incrementScore(state) {
      state.score += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      state.questions = action.payload;
    });
  },
});

export const { nextQuestion, incrementScore } = quizSlice.actions;
export default quizSlice.reducer;