import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { initialQuizSlice } from './quiz.slice';
import { computed } from '@angular/core';
import { addAnswer, resetQuiz } from './quiz.updaters';

export const QuizStore = signalStore(
  { providedIn: 'root' },
  withState(initialQuizSlice),
  withComputed((store) => {
    const currentQuestionIndex = computed(() => store.answers().length);
    const currentQuestion = computed(() => store.questions()[currentQuestionIndex()]);
    const questionCount = computed(() => store.questions().length);
    const isDone = computed(() => store.answers().length === store.questions().length);

    return {
      currentQuestionIndex,
      currentQuestion,
      questionCount,
      isDone,
    };
  }),
  withMethods((store) => ({
    addAnswer: (index: number) => patchState(store, addAnswer(index)),
    reset: () => patchState(store, resetQuiz()),
  })),
);
