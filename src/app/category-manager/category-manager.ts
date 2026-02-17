import { CategoryDialog } from '../category-dialog/category-dialog';
import { CategoryLoader, Category } from '../services/category-loader';
import { Component, inject } from '@angular/core';
import { FoodLoader, FridgeItem } from '../services/food-loader';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
	selector: 'app-category-manager',
	imports: [
		MatButtonModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatTableModule,
		MatToolbarModule,
	],
	templateUrl: './category-manager.html',
	styleUrl: './category-manager.css',
})
export class CategoryManager {
	readonly categoryLoader = inject(CategoryLoader);
	readonly foodLoader = inject(FoodLoader);
	readonly dialog = inject(MatDialog);
	categories = new MatTableDataSource<Category>([]);

	displayedColumns: string[] = [
		'name', 
		'unit', 
		'aliases', 
		'defaultExpiryDuration', 
		'defaultExpiryDurationAfterOpening',
		'actions',
	];

	ngOnInit() {
		this.categoryLoader.loadCategories().then((items) => {
			this.categories.data = items;
		}).catch((err) => {
			console.error("[CategoryManager.ngOnInit] Error loading categories:", err);
		});
	}

	openDialog(categoryIndex?: number) {
		const category: Category = categoryIndex !== undefined 
			? this.categories.data[categoryIndex] 
			: {
				name: '',
				unit: 'g/kg',
				aliases: [],
				defaultExpiryDuration: { days: 0, months: 0, years: 0 },
				defaultExpiryDurationAfterOpening: { days: 0, months: 0, years: 0 },
			};
		
		const dialogRef = this.dialog.open(CategoryDialog, {
			data: { ...category }, // Pass a copy of the category to avoid direct mutations
		});

		dialogRef.afterClosed().subscribe((result: Category) => {
			if (result === undefined || !this.verifyCategory(result)) {
				return;
			}
			
			if (categoryIndex !== undefined) {
				this.categories.data[categoryIndex] = result;
			} else {
				this.categories.data.push(result);
			}

			this.categories._updateChangeSubscription();
			this.categoryLoader.saveCategories(this.categories.data).catch((err) => {
				console.error("[CategoryManager.openDialog] Error saving categories:", err);
			});
		});
	}

	verifyCategory(category: Category): boolean {
		if (category.name.trim().length === 0) {
			return false;
		}

		if (category.unit.trim().length === 0) {
			return false;
		}

		if (category.defaultExpiryDuration 
			&& category.defaultExpiryDuration.days === 0 
			&& category.defaultExpiryDuration.months === 0 
			&& category.defaultExpiryDuration.years === 0
		) {
			return false;
		}

		if (category.defaultExpiryDurationAfterOpening
			&& category.defaultExpiryDurationAfterOpening.days === 0
			&& category.defaultExpiryDurationAfterOpening.months === 0
			&& category.defaultExpiryDurationAfterOpening.years === 0
		) {
			return false;
		}

		return true;
	}

	deleteCategory(categoryIndex: number) {
		this.foodLoader.loadFridgeItems().then((items: FridgeItem[]) => {
			const categoryName = this.categories.data[categoryIndex].name;
			const itemsFromCategory = items.filter(item => item.category.toLowerCase() === categoryName.toLowerCase());
			if (itemsFromCategory.length > 0) {
				let errorMessage = `Cannot delete category "${categoryName}" because it is still used by some fridge items:\n`;
				for (const item of itemsFromCategory) {
					 errorMessage += `- ${item.name}\n`;
				}
				alert(errorMessage);
				return;
			}
			this.categories.data.splice(categoryIndex, 1);
			this.categories._updateChangeSubscription();
			this.categoryLoader.saveCategories(this.categories.data).catch((err) => {
				console.error("[CategoryManager.deleteCategory] Error saving categories:", err);
			});
		}).catch((err) => {
			console.error("[CategoryManager.deleteCategory] Error checking before deleting category:", err);
		});
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.categories.filter = filterValue.trim().toLowerCase();
	}
}
