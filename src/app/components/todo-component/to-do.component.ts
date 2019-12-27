import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/Models/todo';
import { TodoRepositoryService } from 'src/app/Services/todo-repository.service';
@Component({
  selector: 'to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
})
export class ToDoComponent implements OnInit {
  @Input() todo: Todo=new Todo();
  constructor(private todoDataService: TodoRepositoryService) { }
  ngOnInit() {
  }
  @Output()
  changeCompleteStatus: EventEmitter<Todo> = new EventEmitter();
  @Output()
  delete: EventEmitter<Todo> = new EventEmitter();

  changeTodoCompleteStatus() {
    this.changeCompleteStatus.emit(this.todo);
  }
  deleteTodo() {
    this.delete.emit(this.todo);
  }
}
