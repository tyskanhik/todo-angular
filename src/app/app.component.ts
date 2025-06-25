import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from "./shared/theme-toggle/theme-toggle.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, ThemeToggleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {
  title = 'todo';
}
