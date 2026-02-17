import { Category } from '../services/category-loader';
import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
import { MatSelectModule } from '@angular/material/select';


@Component({
	selector: 'app-category-dialog',
	imports: [
		FormsModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatCheckboxModule,
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
		MatDialogClose,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
	],
	templateUrl: './category-dialog.html',
	styleUrl: './category-dialog.css',
})
export class CategoryDialog {
	readonly dialogRef = inject(MatDialogRef<CategoryDialog>);
	readonly data = inject<Category>(MAT_DIALOG_DATA);
	
	readonly name = model(this.data.name);
	readonly unit = model(this.data.unit);
	readonly aliases = model(this.data.aliases.join(','));
	cannotExpire: boolean = this.data.defaultExpiryDuration === undefined || false;
	expiryDurationUnit: 'days' | 'months' | 'years' = 'days';
	readonly defaultExpiryDurationDays = model(this.data.defaultExpiryDuration?.days || 0);
	readonly defaultExpiryDurationMonths = model(this.data.defaultExpiryDuration?.months || 0);
	readonly defaultExpiryDurationYears = model(this.data.defaultExpiryDuration?.years || 0);
	cannotExpireAfterOpening: boolean = this.data.defaultExpiryDurationAfterOpening === undefined || false;
	expiryDurationAfterOpeningUnit: 'days' | 'months' | 'years' = 'days';
	readonly defaultExpiryDurationAfterOpeningDays = model(this.data.defaultExpiryDurationAfterOpening?.days || 0);
	readonly defaultExpiryDurationAfterOpeningMonths = model(this.data.defaultExpiryDurationAfterOpening?.months || 0);
	readonly defaultExpiryDurationAfterOpeningYears = model(this.data.defaultExpiryDurationAfterOpening?.years || 0);

	save() {
		return {
			name: this.name(),
			unit: this.unit(),
			aliases: this.aliases().split(',').map(alias => alias.trim()).filter(alias => alias.length > 0),
			defaultExpiryDuration: this.cannotExpire ? undefined : {
				days: this.defaultExpiryDurationDays(),
				months: this.defaultExpiryDurationMonths(),
				years: this.defaultExpiryDurationYears(),
			},
			defaultExpiryDurationAfterOpening: this.cannotExpireAfterOpening ? undefined : {
				days: this.defaultExpiryDurationAfterOpeningDays(),
				months: this.defaultExpiryDurationAfterOpeningMonths(),
				years: this.defaultExpiryDurationAfterOpeningYears(),
			},
		} as Category;
	}

	quit() {
		this.dialogRef.close();
	}
}
