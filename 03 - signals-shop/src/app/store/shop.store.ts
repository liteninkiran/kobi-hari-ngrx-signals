import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { initialShopSlice } from './shop.slice';
import { computed } from '@angular/core';
import { buildCartVm, buildProductListVm } from './shop-vm.builder';
import * as updaters from './shop.updaters';

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
  withMethods((store) => ({
    setSearchWord: (searchWord: string) => patchState(store, updaters.setSearchWord(searchWord)),
    addToCart: (productId: string) => patchState(store, updaters.addToCart(productId)),
    viewCart: () => patchState(store, updaters.viewCart()),
    hideCart: () => patchState(store, updaters.hideCart()),
    incrementQuantity: (productId: string) => patchState(store, updaters.incrementQuantity(productId)),
    decrementQuantity: (productId: string) => patchState(store, updaters.decrementQuantity(productId)),
    checkoutCart: () => patchState(store, updaters.checkoutCart()),
  })),
);
