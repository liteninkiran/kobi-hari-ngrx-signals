import { CartItemVm } from '../components/cart/view-model/cart-item.vm';
import { ProductItemVm } from '../components/items-list/view-model/product-item.vm';
import { Product } from '../models/product.model';
import { CartVm, ProductListVm } from './shop.vm';

type ProductProps = {
  products: Product[];
  searchWord: string;
  quantities: Record<string, number>;
};

type CartProps = {
  products: Product[];
  quantities: Record<string, number>;
  taxRate: number;
  cartVisible: boolean;
};

export function buildProductListVm({ products, searchWord, quantities }: ProductProps): ProductListVm {
  function buildProductItems(): ProductItemVm[] {
    const word = searchWord.trim().toLowerCase();
    const filterFn = (product: Product) => product.name.toLowerCase().includes(word);
    const mapFn = (product: Product) => ({
      ...product,
      quantity: quantities[product.id] || 0,
    });

    return products.filter(filterFn).map(mapFn);
  }

  return {
    productItems: buildProductItems(),
  };
}

export function buildCartVm({ products, quantities, taxRate, cartVisible }: CartProps): CartVm {
  const items = buildCartItems();
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;
  const itemsCount = items.length;
  const isActive = itemsCount > 0;
  const isVisible = cartVisible;
  const canCheckout = isActive;

  function buildCartItems(): CartItemVm[] {
    const filterFn = (product: Product) => quantities[product.id];
    const mapFn = (product: Product) => ({
      id: product.id,
      name: product.name,
      price: product.unitPrice,
      quantity: quantities[product.id],
      total: product.unitPrice * quantities[product.id],
    });

    return products.filter(filterFn).map(mapFn);
  }

  return { items, subtotal, tax, total, itemsCount, isActive, isVisible, canCheckout };
}
