import { Injectable } from '@angular/core';
import fs from 'fs';
import os from 'os';
import path from 'path';

export interface Category {
  name: string;
  unit: string;
}

@Injectable({
	providedIn: 'root',
})
export class CategoryLoader {
	private categoriesStorageFilePath = path.join(os.homedir(), '.pastry-helper', 'categories.json');

	constructor() {
		if (!fs.existsSync(path.dirname(this.categoriesStorageFilePath))) {
			fs.mkdirSync(path.dirname(this.categoriesStorageFilePath), { recursive: true });
		}
		if (!fs.existsSync(this.categoriesStorageFilePath)) {
			fs.writeFileSync(this.categoriesStorageFilePath, '[]');
		}
	}

	loadCategories(): Category[] {
		let content = fs.readFileSync(this.categoriesStorageFilePath, 'utf-8');
		return JSON.parse(content) as Category[];
	}

	saveCategories(items: Category[]): void {
		fs.writeFileSync(this.categoriesStorageFilePath, JSON.stringify(items));
	}
}
