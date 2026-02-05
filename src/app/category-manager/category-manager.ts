import { Component, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoryLoader, Category } from '../services/category-loader';

@Component({
	selector: 'app-category-manager',
	imports: [
		MatTableModule,
		MatInputModule,
		MatFormFieldModule,
	],
	templateUrl: './category-manager.html',
	styleUrl: './category-manager.css',
})
export class CategoryManager {
	readonly categoryLoader = inject(CategoryLoader);
	categories = new MatTableDataSource<Category>([]);

	displayedColumns: string[] = ['name', 'unit', 'aliases', 'defautExpiryDuration', 'defautExpiryDurationAfterOpening'];

	ngOnInit() {
		this.categoryLoader.loadCategories().then((items) => {
			this.categories.data = items;
		}).catch((err) => {
			console.error("[CategoryManager.ngOnInit] Error loading categories:", err);
		});
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.categories.filter = filterValue.trim().toLowerCase();
	}
}
