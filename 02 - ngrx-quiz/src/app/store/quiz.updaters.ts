import { PartialStateUpdater } from '@ngrx/signals';
import { QuizSlice } from './quiz.slice';

type QuizUpdate = PartialStateUpdater<QuizSlice>;

export const addAnswer =
  (index: number): QuizUpdate =>
  (state): Partial<QuizSlice> => ({ answers: [...state.answers, index] });

export const resetQuiz = (): QuizUpdate => (): Partial<QuizSlice> => ({ answers: [] });
