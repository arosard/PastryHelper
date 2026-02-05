import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

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
		MatToolbarModule,
	],
	templateUrl: './app.html',
	styleUrl: './app.css'
})
export class App {
	private breakpointObserver = inject(BreakpointObserver);

	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches),
			shareReplay()
		);
}
