import { Component } from '@angular/core';
import { TodoList } from './components/todo-list/todo-list';

@Component({
  selector: 'app-root',
    standalone: true,
  imports: [TodoList],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
}
