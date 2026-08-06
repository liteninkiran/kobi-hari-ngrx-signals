import { PartialStateUpdater } from '@ngrx/signals';
import { ShopSlice } from './shop.slice';

type ShopUpdater = PartialStateUpdater<ShopSlice>;

export function setSearchWord(searchWord: string): ShopUpdater {
  return () => ({ searchWord });
}

export function addToCart(productId: string): ShopUpdater {
  return (state) => {
    const cartQuantities = { ...state.cartQuantities };
    cartQuantities[productId] = cartQuantities[productId] + 1 || 1;
    return { cartQuantities };
  };
}

export function viewCart(): ShopUpdater {
  return () => ({ cartVisible: true });
}

export function hideCart(): ShopUpdater {
  return () => ({ cartVisible: false });
}

export function incrementQuantity(productId: string): ShopUpdater {
  return addToCart(productId);
}

export function decrementQuantity(productId: string): ShopUpdater {
  return (state) => {
    const cartQuantities = { ...state.cartQuantities };
    const newQuantity = cartQuantities[productId] - 1;
    if (newQuantity > 0) {
      cartQuantities[productId] = newQuantity;
    } else {
      delete cartQuantities[productId];
    }

    return { cartQuantities };
  };
}

export function checkoutCart(): ShopUpdater {
  return () => ({
    cartQuantities: {},
    cartVisible: false,
  });
}
