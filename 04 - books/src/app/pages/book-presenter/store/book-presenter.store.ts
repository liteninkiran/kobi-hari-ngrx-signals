import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { initialBookPresenterSlice } from './book-presenter.slice';
import { computed } from '@angular/core';
import { BOOKS_COLLECTION } from '../../../data/books-collection';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { Book } from '../../../models/book.model';

export const BookPresenterStore = signalStore(
  withState(initialBookPresenterSlice),
  withEntities<Book>(),
  withComputed((store) => ({
    book: computed(() => store.entityMap()[store.id()]),
  })),
  withMethods((store) => ({
    setBookId: signalMethod<number>((id) => patchState(store, { id })),
  })),
  withDevtools('book-presenter'),
  withHooks((store) => ({
    onInit: () => {
      patchState(store, setAllEntities(BOOKS_COLLECTION));
    },
  })),
);
