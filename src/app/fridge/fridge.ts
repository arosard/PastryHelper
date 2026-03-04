import { CategoryLoader, Category } from '../services/category-loader';
import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FoodLoader, FridgeItem } from '../services/food-loader';
import { FridgeDialog } from '../fridge-dialog/fridge-dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
	selector: 'app-fridge',
	imports: [
		DatePipe,
		MatButtonModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatTableModule,
		MatToolbarModule,
	],
	templateUrl: './fridge.html',
	styleUrl: './fridge.css',
})
export class Fridge {
	readonly foodLoader = inject(FoodLoader);
	readonly categoryLoader = inject(CategoryLoader);
	readonly dialog = inject(MatDialog);
	fridgeItems = new MatTableDataSource<FridgeItem>(this.foodLoader.loadFridgeItems());
	categories: Category[] = this.categoryLoader.loadCategories();

	displayedColumns: string[] = ['category', 'name', 'quantity', 'expiryDate', 'actions'];

	openDialog(fridgeItemIndex?: number) {
		const fridgeItem: FridgeItem = fridgeItemIndex !== undefined 
			? this.fridgeItems.data[fridgeItemIndex] 
			: {
				name: '',
				category: '',
				quantity: 0,
				expiryDate: new Date(),
				opened: false,
			} as FridgeItem;
		
		const dialogRef = this.dialog.open(FridgeDialog, {
			data: { ...fridgeItem }, 
		});

		dialogRef.afterClosed().subscribe((result: FridgeItem) => {
			if (result === undefined || !this.verifyFridgeItem(result)) {
				return;
			}
			
			if (fridgeItemIndex !== undefined) {
				this.fridgeItems.data[fridgeItemIndex] = result;
			} else {
				this.fridgeItems.data.push(result);
			}

			this.fridgeItems._updateChangeSubscription();
			this.foodLoader.saveFridgeItems(this.fridgeItems.data);
		});
	}

	verifyFridgeItem(fridgeItem: FridgeItem): boolean {
		if (fridgeItem.name.trim().length === 0) {
			return false;
		}

		const category = this.categories.find(cat => cat.name === fridgeItem.category);
		if (!category) {
			return false;
		}

		if (fridgeItem.expiryDate.getTime() < Date.now()) {
			return false;
		}

		if (fridgeItem.quantity < 0) {
			return false;
		}

		return true;
	}

	deleteFridgeItem(fridgeItemIndex: number) {
		this.fridgeItems.data.splice(fridgeItemIndex, 1);
		this.fridgeItems._updateChangeSubscription();
		this.foodLoader.saveFridgeItems(this.fridgeItems.data);
	}

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
