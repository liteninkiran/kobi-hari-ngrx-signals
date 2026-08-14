import {
  Prettify,
  PartialStateUpdater,
  signalStoreFeature,
  withMethods,
  patchState,
  type,
  SignalStoreFeature,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, Observable, tap } from 'rxjs';
import { setBusy, setIdle } from '../with-busy/with-busy.updaters';
import { BusySlice } from '../with-busy/with-busy.slice';
import { tapResponse } from '@ngrx/operators';

type Update<S extends object> = Partial<Prettify<S>> | PartialStateUpdater<Prettify<S>>;

type Input<S> = {
  state: S & BusySlice;
  props: {};
  methods: {};
};

type Output = {
  state: {};
  props: {};
  methods: {
    _load: () => void;
  };
};

type Props<T, S extends object> = {
  loader: () => Observable<T>;
  updater: (data: T) => Update<S>;
};

type Feature<S> = SignalStoreFeature<Input<S>, Output>;

export function withService<T, S extends object>({ loader, updater }: Props<T, S>): Feature<S>;
export function withService<T, S extends object>({ loader, updater }: Props<T, S>) {
  return signalStoreFeature(
    {
      state: type<S & BusySlice>(),
    },
    withMethods((store) => {
      const source$ = loader();
      return {
        _load: rxMethod<void>((trigger$) =>
          trigger$.pipe(
            tap((_) => patchState(store, setBusy() as any)),
            exhaustMap((_) =>
              source$.pipe(
                tapResponse({
                  next: (value) => patchState(store, updater(value)),
                  error: (error) => console.log(error),
                  finalize: () => patchState(store, setIdle() as any),
                }),
              ),
            ),
          ),
        ),
      };
    }),
  );
}
