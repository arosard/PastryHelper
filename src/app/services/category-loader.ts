import { Injectable } from '@angular/core';

export interface ExpiryDuration {
	days: number;
	months: number;
	years: number;
}

export interface Category {
  name: string;
  unit: "ml/L" | "g/kg";
  aliases: string[];
  defaultExpiryDuration: ExpiryDuration | undefined;
  defaultExpiryDurationAfterOpening: ExpiryDuration | undefined;
}

@Injectable({
	providedIn: 'root',
})
export class CategoryLoader {
	private categories: Category[] = [];

	constructor() {
		this.init();
	}

	init() {
		this.loadCategoriesFromFile();
	}

	loadCategories(): Category[] {
		return this.categories;
	}

	saveCategories(categories: Category[]) {
		this.categories = categories;
		this.saveCategoriesToFile();
	}

	private async loadCategoriesFromFile() {
		if (!window) {
			console.error("[CategoryLoader.loadCategories] Window object is not available.");
			return;
		}
		console.log("Loading categories...");
		const content = await window.categoryApi.loadCategories();
		console.log("Categories loaded from file");
		this.categories = content || [];
	}

	private async saveCategoriesToFile(): Promise<void> {
		if (!window) {
			console.error("[CategoryLoader.saveCategories] Window object is not available.");
			return;
		}
		await window.categoryApi.saveCategories(this.categories);
	}
}
