import { Component } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoInput } from '../todo-input/todo-input';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoInput],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
})
export class TodoList {
  todos: Todo[] = [];

  addTodo(todo: any) {
  this.todos.push({
    ...todo,
    id: Date.now(),
    completed: false
  });
}


  toggle(todo: Todo) {
    todo.completed = !todo.completed;
  }

  delete(id: number) {
    this.todos = this.todos.filter(t => t.id !== id);
  }
}
