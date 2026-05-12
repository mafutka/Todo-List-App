import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private api = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<any> {
    return this.http.get(this.api);
  }

  addTodo(todo: any): Observable<any> {
    return this.http.post(this.api, todo);
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  updateTodo(todo: any): Observable<any> {
    return this.http.put(`${this.api}/${todo.id}`, todo);
  }
}