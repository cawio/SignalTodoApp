import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-todo-dialog',
  standalone: true,
  imports: [
    MatFormField,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
  ],
  templateUrl: './add-todo-dialog.component.html',
  styleUrl: './add-todo-dialog.component.scss'
})
export class AddTodoDialogComponent {
  title = '';
  description = '';

  constructor(private matDialogRef: MatDialogRef<AddTodoDialogComponent>) { }

  public onCancelClicked(): void {
    this.matDialogRef.close();
  }
}
