import { Injectable } from '@angular/core';
import fs from 'fs';
import os from 'os';
import path from 'path';

export interface FridgeItem {
	category: string;
	name: string;
	quantity: number;
	expiryDate: Date;
}

@Injectable({
	providedIn: 'root',
})
export class FoodLoader {
	private foodStorageFilePath = path.join(os.homedir(), '.pastry-helper', 'fridge.json');

	constructor() {
		if (!fs.existsSync(path.dirname(this.foodStorageFilePath))) {
			fs.mkdirSync(path.dirname(this.foodStorageFilePath), { recursive: true });
		}
		if (!fs.existsSync(this.foodStorageFilePath)) {
			fs.writeFileSync(this.foodStorageFilePath, '[]');
		}
	}

	loadFridgeItems(): FridgeItem[] {
		let content = fs.readFileSync(this.foodStorageFilePath, 'utf-8');
		return JSON.parse(content) as FridgeItem[];
	}

	saveFridgeItems(items: FridgeItem[]): void {
		fs.writeFileSync(this.foodStorageFilePath, JSON.stringify(items));
	}
}
