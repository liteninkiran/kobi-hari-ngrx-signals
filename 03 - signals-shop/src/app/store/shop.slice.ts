import { ALL_PRODUCTS } from '../data/all-products';
import { Product } from '../models/product.model';

export interface ShopSlice {
  readonly products: Product[];
  readonly searchWord: string;
  readonly cartQuantities: Record<string, number>;
  readonly cartVisible: boolean;
  readonly taxRate: number;
}

export type PersistedShopSlice = Pick<ShopSlice, 'cartQuantities'>;

export const initialShopSlice: ShopSlice = {
  products: ALL_PRODUCTS,
  searchWord: 'signal',
  cartQuantities: {
    'signal-booster': 3,
    'reactive-refresher': 2,
  },
  cartVisible: false,
  taxRate: 0.08,
};
