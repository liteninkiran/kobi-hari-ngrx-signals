import { signalStore, withComputed, withState } from '@ngrx/signals';
import { initialShopSlice } from './shop.slice';
import { computed } from '@angular/core';
import { buildCartVm, buildProductListVm } from './shop-vm.builder';

export const ShopStore = signalStore(
  { providedIn: 'root' },
  withState(initialShopSlice),
  withComputed((store) => ({
    productListVm: computed(() =>
      buildProductListVm({
        products: store.products(),
        searchWord: store.searchWord(),
        quantities: store.cartQuantities(),
      }),
    ),
    cartVm: computed(() =>
      buildCartVm({
        cartVisible: store.cartVisible(),
        products: store.products(),
        quantities: store.cartQuantities(),
        taxRate: store.taxRate(),
      }),
    ),
  })),
);
