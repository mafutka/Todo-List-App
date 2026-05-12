import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../models/todo.model';
import { TodoInput } from '../todo-input/todo-input';
import { TodoService } from '../../services/services';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoInput, FormsModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
})
export class TodoList {

  todos: Todo[] = [];

  filter: 'all' | 'completed' | 'active' = 'all';

  editingId: number | null = null;
  editTitle = '';

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe((data: any) => {
      this.todos = data.slice(0, 10);
    });
  }

  addTodo(todo: any) {
    this.todoService.addTodo(todo).subscribe((newTodo) => {
      this.todos.push({
        ...newTodo,
        completed: false
      });
    });
  }

  toggle(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe();
  }

  delete(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter(t => t.id !== id);
    });
  }

  sortByPriority() {
    const order = { high: 3, medium: 2, low: 1 };
    this.todos.sort((a, b) => order[b.priority] - order[a.priority]);
  }

  get filteredTodos() {
    if (this.filter === 'completed') {
      return this.todos.filter(t => t.completed);
    }
    if (this.filter === 'active') {
      return this.todos.filter(t => !t.completed);
    }
    return this.todos;
  }

  startEdit(todo: Todo) {
    this.editingId = todo.id;
    this.editTitle = todo.title;
  }

  saveEdit(todo: Todo) {
    todo.title = this.editTitle;
    this.editingId = null;

    this.todoService.updateTodo(todo).subscribe();
  }
}