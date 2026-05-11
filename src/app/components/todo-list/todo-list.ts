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

  addTodo(data: any) {
    const newTodo: Todo = {
      id: Date.now(),
      title: data.title,
      completed: false,
      priority: data.priority,
      createdAt: new Date(),
      dueDate: data.dueDate,
    };

    this.todos.push(newTodo);
  }

  toggle(todo: Todo) {
    todo.completed = !todo.completed;
  }

  delete(id: number) {
    this.todos = this.todos.filter(t => t.id !== id);
  }
}
