import { Injectable } from '@angular/core';

export interface FridgeItem {
	category: string;
	name: string;
	quantity: number;
	expiryDate: Date;
	opened: boolean;
}

@Injectable({
	providedIn: 'root',
})
export class FoodLoader {
	async loadFridgeItems(): Promise<FridgeItem[]> {
		if (!window) {
			console.error("[FoodLoader.loadFridgeItems] Window object is not available.");
			return [];
		}
		console.log("Loading fridge items...");
		let content = await window.foodApi.loadFridgeItems();
		return content as FridgeItem[];
	}

	async saveFridgeItems(items: FridgeItem[]): Promise<void> {
		if (!window) {
			console.error("[FoodLoader.saveFridgeItems] Window object is not available.");
			return;
		}
		console.log("Saving fridge items...");
		await window.foodApi.saveFridgeItems(items);
	}
}
