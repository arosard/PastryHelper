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
	private fridgeItems: FridgeItem[] = [];

	constructor() {
		this.init();
	}

	init() {
		this.loadFridgeItemsFromFile();
	}

	loadFridgeItems() {
		return this.fridgeItems;
	}

	saveFridgeItems(items: FridgeItem[]) {
		this.fridgeItems = items;
		this.saveFridgeItemsToFile();
	}

	private async loadFridgeItemsFromFile() {
		if (!window) {
			console.error("[FoodLoader.loadFridgeItems] Window object is not available.");
			return;
		}
		console.log("Loading fridge items...");
		const content = await window.foodApi.loadFridgeItems();
		console.log("Fridge items loaded from file");
		this.fridgeItems = content || [];
	}

	private async saveFridgeItemsToFile(): Promise<void> {
		if (!window) {
			console.error("[FoodLoader.saveFridgeItems] Window object is not available.");
			return;
		}
		console.log("Saving fridge items...");
		await window.foodApi.saveFridgeItems(this.fridgeItems);
	}
}
