import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Fridge } from './fridge/fridge';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Fridge],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
