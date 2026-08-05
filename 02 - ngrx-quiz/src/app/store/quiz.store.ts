import {
  getState,
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { initialQuizSlice, QuizSlice } from './quiz.slice';
import { computed, effect } from '@angular/core';
import { addAnswer, resetQuiz } from './quiz.updaters';
import { getCorrectCount } from './quiz.helpers';

export const QuizStore = signalStore(
  { providedIn: 'root' },
  withState(initialQuizSlice),
  withComputed((store) => {
    const currentQuestionIndex = computed(() => store.answers().length);
    const currentQuestion = computed(() => store.questions()[currentQuestionIndex()]);
    const questionCount = computed(() => store.questions().length);
    const correctCount = computed(() =>
      getCorrectCount({
        answers: store.answers(),
        questions: store.questions(),
      }),
    );
    const isDone = computed(() => store.answers().length === store.questions().length);

    return {
      currentQuestionIndex,
      currentQuestion,
      questionCount,
      correctCount,
      isDone,
    };
  }),
  withMethods((store) => ({
    addAnswer: (index: number) => patchState(store, addAnswer(index)),
    reset: () => patchState(store, resetQuiz()),
  })),
  withHooks((store) => ({
    onInit: () => {
      const stateJson = localStorage.getItem('quiz');
      if (stateJson) {
        const state = JSON.parse(stateJson) as QuizSlice;
        patchState(store, state);
      }
      effect(() => {
        const state = getState(store);
        const stateJson = JSON.stringify(state);
        localStorage.setItem('quiz', stateJson);
      });
    },
  })),
);
