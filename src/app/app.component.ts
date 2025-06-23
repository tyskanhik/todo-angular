import { Component } from '@angular/core';
import { TaskListComponent } from "./features/task-list/task-list.component";

@Component({
  selector: 'app-root',
  imports: [TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {
  title = 'todo';
}
