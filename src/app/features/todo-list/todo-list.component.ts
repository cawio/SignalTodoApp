import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TodoService } from '../../services/todo.service';
import { TodoComponent } from '../todo/todo.component';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoDialogComponent } from '../add-todo-dialog/add-todo-dialog.component';
import { TodosStore } from '../store/todos.store';

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
  private readonly store = inject(TodosStore);
  todos = this.store.filteredTodos;
  todoFilter = this.store.filter;

  constructor(private todoService: TodoService, private dialog: MatDialog) { }

  public onTodoDeleteClicked(id: number): void {
    this.store.deleteTodo(id);
  }

  public onTodoCompleteClicked(id: number): void {
    this.store.completeTodo(id);
  }

  public onTodoUncompleteClicked(id: number): void {
    this.store.uncompleteTodo(id);
  }

  public onTodoFilterChanged(filter: string): void {
    this.store.setFilter(filter);
  }

  public async onRefreshTodosClicked(): Promise<void> {
    await this.store.load()
  }

  public onResetFilterClicked(): void {
    this.store.setFilter('');
  }

  public onAddTodoClicked(): void {
    this.dialog
      .open(AddTodoDialogComponent, {
        width: '400px',
      })
      .afterClosed()
      .subscribe((result: { title: string, description: string }) => {
        if (result) {
          this.store.addTodo({
            id: 0,
            title: result.title,
            description: result.description,
            isCompleted: false,
            date: new Date(),
          });
        }
      });
  }
}
