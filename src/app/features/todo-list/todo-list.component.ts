import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TodoService } from '../../services/todo.service';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    TodoComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  todos = this.todoService.filteredTodos;
  todoFilter = this.todoService.todoFilter;

  constructor(private todoService: TodoService) { }

  public onTodoDeleteClicked(id: number): void {
    this.todoService.deleteTodoById(id);
  }

  public onTodoCompleteClicked(id: number): void {
    this.todoService.updateTodoStatus(id, true);
  }

  public onTodoUncompleteClicked(id: number): void {
    this.todoService.updateTodoStatus(id, false);
  }

  public onTodoFilterChanged(filter: string): void {
    this.todoFilter.set(filter);
  }

  public onRefreshTodosClicked(): void {
    this.todoService.refreshTodos();
  }

  public onResetFilterClicked(): void {
    this.todoFilter.set('');
  }
}
