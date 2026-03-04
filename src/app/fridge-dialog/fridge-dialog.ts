import { Category, CategoryLoader } from '../services/category-loader';
import { Component, ElementRef, inject, model, ViewChild } from '@angular/core';
import { FridgeItem } from '../services/food-loader';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
	MAT_DIALOG_DATA,
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogRef,
	MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';


@Component({
	selector: 'app-fridge-dialog',
	imports: [
		FormsModule,
		MatAutocompleteModule,
		MatButtonModule,
		MatCheckboxModule,
		MatDatepickerModule,
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
		MatDialogClose,
		MatFormFieldModule,
		MatInputModule,
	],
	providers: [provideNativeDateAdapter()],
	templateUrl: './fridge-dialog.html',
	styleUrl: './fridge-dialog.css',
})
export class FridgeDialog {
	@ViewChild('input') input!: ElementRef<HTMLInputElement>;
	readonly dialogRef = inject(MatDialogRef<FridgeDialog>);
	readonly data = inject<FridgeItem>(MAT_DIALOG_DATA);
	readonly categoryLoader = inject(CategoryLoader);
	categories:Category[] = this.categoryLoader.loadCategories();
	filteredCategoryNames: string[] = this.categories.map(cat => cat.name);
	
	readonly category = model(this.data.category);
	readonly name = model(this.data.name);
	readonly quantity = model(this.data.quantity)
	readonly expiryDate = model(this.data.expiryDate);
	readonly opened = model(this.data.opened);

	filterCategoryOptions() {
		const filterValue = this.input.nativeElement.value.toLowerCase();
		this.filteredCategoryNames = this.categories.map(cat => cat.name).filter(option => option.toLowerCase().includes(filterValue));
	}

	getCategoryUnit(): string {
		const categoryName = this.category();
		const category = this.categories.find(cat => cat.name === categoryName);
		return category ? category.unit.split('/')[0] : "None";
	}

	save(): FridgeItem {
		return {
			category: this.category(),
			name: this.name(),
			quantity: this.quantity(),
			expiryDate: this.expiryDate() ? new Date(this.expiryDate()) : undefined,
			opened: this.opened(),
		} as FridgeItem;
	}

	quit() {
		this.dialogRef.close();
	}
}
