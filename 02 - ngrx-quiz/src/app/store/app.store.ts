import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { initialAppSlice } from './app.slice';
import { inject } from '@angular/core';
import { changeLanguage, resetLanguages, setBusy } from './app.updaters';
import { DictionariesService } from '../services/dictionaries.service';
import { delay, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialAppSlice),
  withProps((_) => {
    const _dictionariesService = inject(DictionariesService);
    const _languages = _dictionariesService.languages;
    return { _dictionariesService, _languages };
  }),
  withMethods((store) => {
    const invalidateDictionary = rxMethod<string>((input$) =>
      input$.pipe(
        tap((lang) => {
          console.log('Invalidate dictionary', lang);
          patchState(store, setBusy(true));
        }),
        delay(1000),
        tap((lang) => {
          console.log('Invalidate dictionary', lang, '- COMPLETED');
          patchState(store, setBusy(false));
        }),
      ),
    );

    return {
      changeLanguage: () => {
        patchState(store, changeLanguage(store._languages));
        invalidateDictionary(store.selectedLanguage);
      },
      _resetLanguages: () => {
        patchState(store, resetLanguages(store._languages));
        invalidateDictionary(store.selectedLanguage);
      },
    };
  }),
  withHooks((store) => ({
    onInit: () => {
      store._resetLanguages();
    },
  })),
);
