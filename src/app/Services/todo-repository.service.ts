import { Injectable } from '@angular/core';
import { Todo } from '../Models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoRepositoryService {

  //increasing when create a new todo
  currentId: number = 0;
  Todos: Todo[] = [];
  constructor() { }
  create(todo: Todo): TodoRepositoryService {
    if (todo) {
      if (!todo.id) {
        todo.id = ++this.currentId;
      }
      this.Todos.push(todo);
    }
    return this;
  }
  delete(id: number): TodoRepositoryService {
    if (id > 0) {
      this.Todos = this.Todos.filter(x => x.id !== id);
    }
    return this;
  }
  updateById(id:number,newTodo: Todo): Todo {
    let todo = this.getById(id);
    if (!todo) {
      return null;
    }
    return todo;
  }
  exist(id: number): boolean {
    console.log(this.Todos);
    if (this.Todos.find(x => x.id === id).id===id) {
      return true
    }
    return false;
  }
  getAll(): Todo[] {
    return this.Todos;
  }
  getById(id:number): Todo {
    return this.Todos
      .filter(x => x.id === id)
      .pop();
  }
}
