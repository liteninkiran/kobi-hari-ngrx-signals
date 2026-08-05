import { signalStore, withComputed, withState } from '@ngrx/signals';
import { initialQuizSlice } from './quiz.slice';
import { computed } from '@angular/core';

export const QuizStore = signalStore(
  { providedIn: 'root' },
  withState(initialQuizSlice),
  withComputed((store) => ({
    currentQuestionIndex: computed(() => store.answers().length),
    isDone: computed(() => store.answers().length === store.questions.length),
  })),
);
