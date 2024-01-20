import { DatePipe, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TodoDTO } from '../../dtos/TodoDTO';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    DatePipe,
    NgClass
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  @Input() todo?: TodoDTO;
  @Output() deleteTodo = new EventEmitter<number>();
  @Output() completeTodo = new EventEmitter<number>();
  @Output() uncompleteTodo = new EventEmitter<number>();
}
