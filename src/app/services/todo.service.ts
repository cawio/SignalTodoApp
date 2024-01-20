import { Injectable, computed, signal } from '@angular/core';
import { TodoDTO } from '../dtos/TodoDTO';
import { Observable, delay, firstValueFrom, of } from 'rxjs';
import { LoadingService } from '../features/loading-spinner/services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private internalTodos = signal<TodoDTO[]>([]);
  public todos = this.internalTodos.asReadonly();
  public todoFilter = signal<string>('');
  public filteredTodos = computed(() => {
    const todoFilter = this.todoFilter().toLowerCase();

    if (todoFilter === '') {
      return this.todos();
    }

    return this.internalTodos().filter(todo => todo.title.toLowerCase().includes(todoFilter));
  });

  constructor(private loadingService: LoadingService) {
    this.refreshTodos();
  }

  public async refreshTodos(): Promise<void> {
    this.loadingService.startLoading();
    const todos = await firstValueFrom(this.fetchTodos());
    this.internalTodos.set(todos);
    this.loadingService.stopLoading();
  }

  private fetchTodos(): Observable<TodoDTO[]> {
    return of(mockTodos).pipe(delay(1000));
  }

  public updateTodoStatus(id: number, isCompleted: boolean): void {
    this.internalTodos.update(todos => {
      const todoIndex = todos.findIndex(todo => todo.id === id);
      todos[todoIndex].isCompleted = isCompleted;
      return todos;
    });
  }

  public deleteTodoById(id: number): void {
    this.internalTodos.update(todos => todos.filter(todo => todo.id !== id));
  }
}

const mockTodos: TodoDTO[] = [
  {
    id: 1,
    title: 'Learn Angular',
    description: 'Learn Angular using the official tutorial',
    isCompleted: false,
    date: new Date('2021-01-01')
  },
  {
    id: 2,
    title: 'Learn React',
    description: 'Learn React using the official tutorial',
    isCompleted: false,
    date: new Date('2021-01-02')
  },
  {
    id: 3,
    title: 'Learn Vue',
    description: 'Learn Vue using the official tutorial',
    isCompleted: false,
    date: new Date('2021-01-03')
  },
  {
    id: 4,
    title: 'Learn Svelte',
    description: 'Learn Svelte using the official tutorial',
    isCompleted: false,
    date: new Date('2021-01-04')
  },
  {
    id: 5,
    title: 'Learn AngularJS',
    description: 'Learn AngularJS using the official tutorial',
    isCompleted: false,
    date: new Date('2021-01-05')
  },
  {
    id: 6,
    title: 'Learn React Native',
    description: 'Learn React Native using the official tutorial',
    isCompleted: false,
    date: new Date('2021-01-06')
  },
  {
    id: 7,
    title: 'Learn Vue Native',
    description: 'Learn Vue Native using the official tutorial',
    isCompleted: false,
    date: new Date('2021-01-07')
  },
  {
    id: 8,
    title: 'Learn Svelte Native',
    description: 'Learn Svelte Native using the official tutorial',
    isCompleted: false,
    date: new Date('2021-01-08')
  },
  {
    id: 9,
    title: 'Learn AngularDart',
    description: 'Learn AngularDart using the official tutorial',
    isCompleted: false,
    date: new Date('2021-01-09')
  },
  {
    id: 10,
    title: 'Learn React Dart',
    description: 'Learn React Dart using the official tutorial',
    isCompleted: false,
    date: new Date('2021-01-10')
  },
  {
    id: 11,
    title: 'Learn Vue Dart',
    description: 'Learn Vue Dart using the official tutorial',
    isCompleted: false,
    date: new Date('2021-01-11')
  },
]
