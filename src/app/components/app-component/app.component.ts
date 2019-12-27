import { Component, OnInit, Input } from '@angular/core';
import { Todo } from 'src/app/Models/todo';
import { TodoRepositoryService } from 'src/app/Services/todo-repository.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {
  newTodo: Todo = new Todo();
  constructor(private todoDataService: TodoRepositoryService) {
  }
  create() {
    if (this.newTodo.title !== '') {
      this.todoDataService.create(this.newTodo);
      this.newTodo = new Todo();
    }
  }
  get todos() {
    return this.todoDataService.getAll();
  }

  changeTodoCompleteStatus(todo: Todo) {
    todo.complete = !todo.complete;
    this.todoDataService.updateById(todo.id, todo);
  }
  deleteTodo(todo: Todo) {
    this.todoDataService.delete(todo.id);
  }
}
