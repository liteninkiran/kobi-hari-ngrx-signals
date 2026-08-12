import { PartialStateUpdater } from '@ngrx/signals';
import { AppSlice } from './app.slice';
import { Dictionary } from '../data/dictionaries';

export type AppSliceUpdater = PartialStateUpdater<AppSlice>;

export function changeLanguage(languages: string[]): AppSliceUpdater {
  return (state) => {
    const index = languages.indexOf(state.selectedLanguage) ?? -1;
    const nextIndex = (index + 1) % languages.length;
    const selectedLanguage = languages[nextIndex];
    return { selectedLanguage };
  };
}

export function resetLanguages(languages: string[]): AppSliceUpdater {
  return (_) => ({
    possibleLanguages: languages,
    selectedLanguage: languages[0],
  });
}

export function setBusy(isBusy: boolean): AppSliceUpdater {
  return (_) => ({ isBusy });
}

export function setDictionary(dictionary: Dictionary): AppSliceUpdater {
  return (_) => ({ selectedDictionary: dictionary });
}
