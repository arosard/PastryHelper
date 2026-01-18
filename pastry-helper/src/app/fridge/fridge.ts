import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface FridgeItem {
  category: string;
  name: string;
  quantity: number;
  expiryDate: Date;
}

export interface Category {
  name: string;
  unit: string;
}

@Component({
  selector: 'app-fridge',
  imports: [MatTableModule, MatInputModule, MatFormFieldModule, DatePipe],
  templateUrl: './fridge.html',
  styleUrl: './fridge.css',
})
export class Fridge {
  sourceFridgeItems: FridgeItem[] = [
    { category: 'Milk', name: 'whole', quantity: 2000, expiryDate: new Date('2025-07-15') },
    { category: 'Flour', name: 'T55', quantity: 1000, expiryDate: new Date('2026-01-20') },
    { category: 'Butter', name: 'unsalted', quantity: 1000, expiryDate: new Date('2026-08-05') },
  ];
  fridgeItems = new MatTableDataSource<FridgeItem>(this.sourceFridgeItems);

  categories: Category[] = [
    { name: 'Milk', unit: 'ml/L' },
    { name: 'Flour', unit: 'g/kg' },
    { name: 'Butter', unit: 'g/kg' },
  ]

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
