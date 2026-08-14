import {
  signalStoreFeature,
  withComputed,
  withState,
  type EmptyFeatureResult,
  type SignalStoreFeature,
  type SignalStoreFeatureResult,
} from '@ngrx/signals';
import { BusySlice, initialBusySlice } from './with-busy.slice';
import { computed, Signal } from '@angular/core';

type Output = SignalStoreFeatureResult & {
  state: BusySlice;
  props: {
    isIdle: Signal<boolean>;
  };
  methods: {};
};

export function withBusy(): SignalStoreFeature<EmptyFeatureResult, Output>;

export function withBusy(): SignalStoreFeature {
  return signalStoreFeature(
    withState(initialBusySlice),
    withComputed((store) => ({
      isIdle: computed(() => !store.isBusy),
    })),
  );
}
