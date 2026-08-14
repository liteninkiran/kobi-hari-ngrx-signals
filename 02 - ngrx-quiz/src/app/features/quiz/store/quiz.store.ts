import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { initialQuizSlice } from './quiz.slice';
import { computed, inject } from '@angular/core';
import { addAnswer, resetQuestions, resetQuiz } from './quiz.updaters';
import { getCorrectCount } from './quiz.helpers';
import { translate, translateToPairs } from '../../../store/app.helpers';
import { QUESTION_CAPTION } from '../../../data/dictionaries';
import { AppStore } from '../../../store/app.store';
import { ColourQuizGeneratorService } from '../../../services/colour-quiz-generator.service';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { withLocalStorage } from '../../../custom-features/with-local-storage.feature';
import { withBusy } from '../../../custom-features/with-busy/with-busy.feature';
import { withService } from '../../../custom-features/with-service/with-service.feature';

export const QuizStore = signalStore(
  withState(initialQuizSlice),
  withBusy(),
  withService({
    loader: () => inject(ColourQuizGeneratorService).createRandomQuizAsync(),
    updater: resetQuestions,
  }),
  withComputed((store) => {
    const appStore = inject(AppStore);
    const dictionary = appStore.selectedDictionary;

    const currentQuestionIndex = computed(() => store.answers().length);
    const isDone = computed(() => store.answers().length === store.questions().length);
    const currentQuestion = computed(() => store.questions()[currentQuestionIndex()]);
    const questionsCount = computed(() => store.questions().length);
    const correctCount = computed(() => getCorrectCount(store.answers(), store.questions()));
    const title = computed(() => translate(QUESTION_CAPTION, dictionary()));
    const captionColours = computed(() =>
      translateToPairs(currentQuestion().caption, dictionary()),
    );
    const answerColours = computed(() => translateToPairs(currentQuestion().answers, dictionary()));

    return {
      currentQuestionIndex,
      isDone,
      currentQuestion,
      questionsCount,
      correctCount,
      title,
      captionColours,
      answerColours,
    };
  }),
  withMethods((store) => ({
    addAnswer: (index: number) => patchState(store, addAnswer(index)),
    reset: () => patchState(store, resetQuiz()),
    generateQuiz: () => store._load(),
  })),
  withLocalStorage('quiz-store'),
  withDevtools('quiz-store'),
);
