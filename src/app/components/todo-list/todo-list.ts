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
    const saved = localStorage.getItem('todos');

    if (saved) {
      this.todos = JSON.parse(saved);
    } else {
      this.todoService.getTodos().subscribe((data: any) => {
        this.todos = data.slice(0, 10).map((t: any) => ({
          ...t,
          priority: 'medium',
        }));
        this.saveToStorage();
      });
    }
  }

  saveToStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  addTodo(todo: any) {
    const newTodo: Todo = {
      id: Date.now(),
      title: todo.title,
      completed: false,
      priority: todo.priority,
      createdAt: new Date(),
      dueDate: todo.dueDate || new Date(),
    };

    this.todos = [...this.todos, newTodo];

    this.saveToStorage();
  }

  toggle(todo: Todo) {
    todo.completed = !todo.completed;

    this.saveToStorage();
  }

  delete(id: number) {
    this.todos = this.todos.filter((t) => t.id !== id);

    this.saveToStorage();
  }

  sortByPriority() {
    const order = { high: 3, medium: 2, low: 1 };

    this.todos = [...this.todos].sort((a, b) => order[b.priority] - order[a.priority]);

    this.saveToStorage();
  }

  get filteredTodos() {
    if (this.filter === 'completed') {
      return this.todos.filter((t) => t.completed);
    }
    if (this.filter === 'active') {
      return this.todos.filter((t) => !t.completed);
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

    this.saveToStorage();
  }
}
