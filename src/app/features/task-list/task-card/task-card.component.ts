import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../core/models/task.model';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
  standalone: true
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() toggle = new EventEmitter<boolean>;
  @Output() delete = new EventEmitter<void>;
}
