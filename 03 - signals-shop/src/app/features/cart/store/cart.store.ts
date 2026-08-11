import { signalStore, withComputed, withProps, withState } from '@ngrx/signals';
import { initialCartSlice } from './cart.slice';
import { computed, inject } from '@angular/core';
import { ShopStore } from '../../../store/shop.store';
import { buildCartVm } from './cart.vm-builder';

export const CartStore = signalStore(
  withState(initialCartSlice),
  withProps((_) => ({ _shopStore: inject(ShopStore) })),
  withComputed((store) => ({
    cartVm: computed(() =>
      buildCartVm(
        store._shopStore.products(),
        store._shopStore.cartQuantities(),
        store._shopStore.cartVisible(),
        store.taxRate(),
      ),
    ),
  })),
);
