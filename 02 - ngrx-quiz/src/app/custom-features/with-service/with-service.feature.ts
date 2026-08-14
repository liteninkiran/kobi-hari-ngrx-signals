import { Prettify, PartialStateUpdater } from '@ngrx/signals';
import { Observable, of } from 'rxjs';

type Update<S extends object> = Partial<Prettify<S>> | PartialStateUpdater<Prettify<S>>;

export function withService<T, S extends object>(
  loader: () => Observable<T>,
  updater: (data: T) => Update<S>,
) {}
