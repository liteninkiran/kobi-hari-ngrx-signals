import { ProductItemVm } from '../components/items-list/view-model/product-item.vm';
import { Product } from '../models/product.model';
import { ProductListVm } from './shop.vm';

export const buildProductListVm = (
  products: Product[],
  searchWord: string,
  quantities: Record<string, number>,
): ProductListVm => {
  const buildProductItems = (): ProductItemVm[] => {
    const word = searchWord.trim().toLowerCase();
    if (!word) return [];

    const filterFn = (product: Product) => product.name.toLowerCase().includes(word);
    const mapFn = (product: Product) => ({
      ...product,
      quantity: quantities[product.id] || 0,
    });

    return products.filter(filterFn).map(mapFn);
  };

  return {
    productItems: buildProductItems(),
  };
};
