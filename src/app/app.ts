import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CategoryLoader } from './services/category-loader';
import { FoodLoader } from './services/food-loader';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-root',
	imports: [
		AsyncPipe,
		RouterLink,
		RouterOutlet,
		MatButtonModule,
		MatIconModule,
		MatListModule,
		MatSidenavModule,
	],
	templateUrl: './app.html',
	styleUrl: './app.css'
})
export class App {
	private breakpointObserver = inject(BreakpointObserver);
	private categoryLoader = inject(CategoryLoader);
	private foodLoader = inject(FoodLoader);

	constructor() {
		this.categoryLoader.init();
		this.foodLoader.init();
	}

	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches),
			shareReplay()
		);
}
