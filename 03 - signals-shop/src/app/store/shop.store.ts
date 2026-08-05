import { signalStore, withState } from '@ngrx/signals';
import { initialShopSlice } from './shop.slice';

export const ShopStore = signalStore({ providedIn: 'root' }, withState(initialShopSlice));
