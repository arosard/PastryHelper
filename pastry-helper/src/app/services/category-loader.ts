import { Injectable } from '@angular/core';

export interface Category {
  name: string;
  unit: string;
}

@Injectable({
	providedIn: 'root',
})
export class CategoryLoader {
	async loadCategories(): Promise<Category[]> {
		if (!window) {
			console.error("[CategoryLoader.loadCategories] Window object is not available.");
			return [];
		}
		let content = await window.categoryApi.loadCategories();
		return content as Category[];
	}

	async saveCategories(items: Category[]): Promise<void> {
		if (!window) {
			console.error("[CategoryLoader.saveCategories] Window object is not available.");
			return;
		}
		await window.categoryApi.saveCategories(items);
	}
}
