import { effect, inject, Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';
import { StorajeUtil } from '../utils/storage.util';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly storageKey: string = 'task';
  private storage = inject(StorajeUtil);

  private _tasks = signal<Task[]>(this.loadInitialTasks());
  public tasks = this._tasks.asReadonly();

  constructor() {
    effect(() => {
      const currentTasks = this._tasks();
      this.storage.set(this.storageKey, currentTasks as never);
      console.log('Tasks auto-saved to localStorage');
    });
  }

  /**
   * загружаем данные если они имеются
   */
  private loadInitialTasks(): Task[] | [] {
    const data = this.storage.get<Task[]>(this.storageKey);
    return data ? data : [];
  };

  /**
   * Добавление новой задачи
   * @param task 
   */
  addTask(task: Omit<Task, 'id' | 'completed' | 'createdAt'>) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date(),
      ...task
    };
    this._tasks.update(task => [...task, newTask]);
  };

  /**
   * Изменение задачи
   * @param id 
   * @param updatedTask 
   */
  updateTask(id: string, updatedTask: Partial<Task>) {
    this._tasks.update(tasks => 
      tasks.map(task => task.id === id ? {...task, ...updatedTask} : task)
    )
  };

  /**
   * Удаление задачи
   * @param id 
   */
  deleteTask(id: string) {
    this._tasks.update(tasks => tasks.filter(t => t.id !== id));
  };

  /**
   * Полузение одной запили
   * @param id 
   */
  getTaskById(id: string): Task | undefined  {
    return this._tasks().find(t => t.id === id);
  };
}