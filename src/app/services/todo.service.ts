import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { TodoDTO } from '../dtos/TodoDTO';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  fetchTodos(): Observable<TodoDTO[]> {
    const ms = Math.floor(Math.random() * 2000) + 1000;
    return of(mockTodos).pipe(delay(ms));
  }
}

const mockTodos: TodoDTO[] = [
  {
    id: 1,
    title: 'Organize Team Building Event',
    description: 'Coordinate with the events company to organize a team building activity for next month.',
    isCompleted: false,
    date: new Date('2023-07-05')
  },
  {
    id: 2,
    title: 'Prepare Financial Report',
    description: 'Compile and prepare the financial report for Q2 and submit it to the finance department.',
    isCompleted: true,
    date: new Date('2023-07-12')
  },
  {
    id: 3,
    title: 'Update Website Content',
    description: 'Review and update the about us and careers page content on the company website.',
    isCompleted: false,
    date: new Date('2023-07-20')
  },
  {
    id: 4,
    title: 'Plan Marketing Campaign',
    description: 'Plan the upcoming marketing campaign, including budget allocation and target demographics.',
    isCompleted: true,
    date: new Date('2023-08-01')
  },
  {
    id: 5,
    title: 'Conduct Employee Surveys',
    description: 'Create and distribute employee satisfaction surveys to gather feedback on workplace environment.',
    isCompleted: false,
    date: new Date('2023-08-15')
  },
  {
    id: 6,
    title: 'Inventory Check',
    description: 'Carry out a comprehensive inventory check and reconcile any discrepancies.',
    isCompleted: false,
    date: new Date('2023-09-05')
  },
  {
    id: 7,
    title: 'Organize Training Session',
    description: 'Organize a training session for new software tools recently introduced to the team.',
    isCompleted: true,
    date: new Date('2023-09-20')
  },
  {
    id: 8,
    title: 'Renew Office Lease',
    description: 'Negotiate terms and renew the office lease agreement for the upcoming year.',
    isCompleted: false,
    date: new Date('2023-10-01')
  },
  {
    id: 9,
    title: 'Evaluate New Project Proposals',
    description: 'Review and evaluate the new project proposals submitted by the R&D department.',
    isCompleted: false,
    date: new Date('2023-10-15')
  },
  {
    id: 10,
    title: 'Health and Safety Audit',
    description: 'Conduct a health and safety audit to ensure the workplace meets regulatory standards.',
    isCompleted: true,
    date: new Date('2023-11-01')
  },
]
