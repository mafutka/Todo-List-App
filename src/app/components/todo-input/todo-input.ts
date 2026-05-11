import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-input',
   standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-input.html',
  styleUrls: ['./todo-input.scss'],
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
