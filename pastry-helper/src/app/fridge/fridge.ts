import { Component, model, input, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FoodLoader, FridgeItem } from '../services/food-loader';
import { CategoryLoader, Category } from '../services/category-loader';

@Component({
	selector: 'app-fridge',
	imports: [MatTableModule, MatInputModule, MatFormFieldModule, DatePipe],
	templateUrl: './fridge.html',
	styleUrl: './fridge.css',
})
export class Fridge {
	foodLoader = inject(FoodLoader);
	categoryLoader = inject(CategoryLoader);
	sourceFridgeItems: FridgeItem[] = this.foodLoader.loadFridgeItems();
	fridgeItems = new MatTableDataSource<FridgeItem>(this.sourceFridgeItems);

	categories: Category[] = this.categoryLoader.loadCategories();

	displayedColumns: string[] = ['category', 'name', 'quantity', 'expiryDate'];

	displayQuantity(fridgeItem: FridgeItem): string {
		const category = this.categories.find(cat => cat.name === fridgeItem.category);
		if (!category)
			return fridgeItem.quantity + '?';
		const units = category.unit.split('/');
		let index = Math.floor(Math.log10(fridgeItem.quantity) / 3);
		index = Math.min(index, units.length - 1);
		const unit = units[index];
		const quantity = fridgeItem.quantity / Math.pow(1000, index);
		return quantity + ' ' + unit;
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.fridgeItems.filter = filterValue.trim().toLowerCase();
	}
}
