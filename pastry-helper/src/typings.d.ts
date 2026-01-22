export {};

declare global {
  interface Window {
    foodApi: {
      loadFridgeItems: () => Promise<any[]>;
      saveFridgeItems: (items: any[]) => Promise<void>;
    };
    categoryApi: {
        loadCategories: () => Promise<any[]>;
        saveCategories: (items: any[]) => Promise<void>;
    };
  }
}