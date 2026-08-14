import { PartialStateUpdater } from '@ngrx/signals';
import { BusySlice } from './with-busy.slice';

export type BusySliceUpdater = PartialStateUpdater<BusySlice>;

export function setBusy(): BusySliceUpdater {
  return (_) => ({ isBusy: true });
}

export function setIdle(): BusySliceUpdater {
  return (_) => ({ isBusy: false });
}

export function toggleBusy(): BusySliceUpdater {
  return (state) => ({ isBusy: !state.isBusy });
}
