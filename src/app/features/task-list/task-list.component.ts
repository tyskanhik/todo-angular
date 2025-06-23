import { Component, computed, inject, signal } from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import { Router } from '@angular/router';
import { TaskCardComponent } from "./task-card/task-card.component";
import { CommonModule } from '@angular/common';
import { Task, TaskFilter } from '../../core/models/task.model';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, TaskCardComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  standalone: true
})
export class TaskListComponent {
  private taskService = inject(TaskService);
  private router = inject(Router)

  filter = signal<TaskFilter>('all');
  private tasks = this.taskService.tasks;

  hasTasks = computed(() => this.tasks().length > 0);
  hasCompletedTasks = computed(() => this.tasks().some(t => t.completed));
  hasActiveTasks = computed(() => this.tasks().some(t => !t.completed));

  filteredTasks = computed(() => {
    const tasks = this.tasks();
    const filter = this.filter();
    
    return tasks.filter(task => {
      if (filter === 'all') return true;
      if (filter === 'completed') return task.completed;
      return !task.completed;
    });
  });

  handleFilterChange(e: Event) {
    this.filter.update(f => f = (e.target as HTMLInputElement).value as TaskFilter)
  }

  chekedCompleted(id: string, task: Task) {
    this.taskService.updateTask(id, {
      completed: !task.completed
    })
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id)
  }

  navigateToAdd() {
    this.router.navigate(['/'])
    this.taskService.addTask({
      title: 'sdf'
    })
  }

   get emptyStateMessage(): string {
    if (!this.hasTasks()) return 'Нет задач';
    
    return this.filter() === 'completed' 
      ? 'Нет выполненных задач' 
      : 'Нет активных задач';
  }
}
