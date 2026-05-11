import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-input',
  imports: [],
  templateUrl: './todo-input.html',
  styleUrl: './todo-input.scss',
})
export class TodoInput {
  title = '';
  priority: 'low' | 'medium' | 'high' = 'medium';
  dueDate = '';

  @Output() add = new EventEmitter<any>();

  onAdd() {
    if (!this.title.trim()) return;

    this.add.emit({
      title: this.title,
      priority: this.priority,
      dueDate: new Date(this.dueDate),
    });

    this.title = '';
  }
}
