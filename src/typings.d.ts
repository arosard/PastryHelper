import type { FridgeItem } from './app/services/food-loader';
import type { Category } from './app/services/category-loader';

declare global {
  interface Window {
    foodApi: {
      loadFridgeItems: () => Promise<FridgeItem[]>;
      saveFridgeItems: (items: FridgeItem[]) => Promise<void>;
    };
    categoryApi: {
        loadCategories: () => Promise<Category[]>;
        saveCategories: (items: Category[]) => Promise<void>;
    };
  }
}

export {};