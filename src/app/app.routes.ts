import { Routes } from '@angular/router';
import { TaskListComponent } from './features/task-list/task-list.component';
import { AddTaskComponent } from './features/add-task/add-task.component';
import { EditTaskComponent } from './features/edit-task/edit-task.component';
import { NotFoundComponent } from './features/not-found/not-found.component';


export const routes: Routes = [
  {
    path: '',
    component: TaskListComponent
  },
  {
    path: 'add',
    component: AddTaskComponent
  },
  { 
    path: 'edit/:id', 
    component: EditTaskComponent 
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
