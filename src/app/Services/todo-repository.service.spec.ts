import { TestBed } from '@angular/core/testing';

import { TodoRepositoryService } from './todo-repository.service';
import { Todo } from '../Models/todo';
import { Title } from '@angular/platform-browser';

describe('TodoRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodoRepositoryService = TestBed.get(TodoRepositoryService);
    expect(service).toBeTruthy();
  });
});

describe('test getAll Todos', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('test create todos', () => {
    const service: TodoRepositoryService = TestBed.get(TodoRepositoryService);

    let todo1 = new Todo({
      title: 'todo 1',
      complete: true
    });
    let todo2 = new Todo({
      title: 'todo 2',
      complete: false
    });
    service.create(todo1);
    service.create(todo2);
    expect(service.getAll()).toEqual([todo1, todo2]);
  });
});


describe('test get Todos', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should return all todos', () => {
    const service: TodoRepositoryService = TestBed.get(TodoRepositoryService);

    let todo1 = new Todo({
      title: 'todo 1',
      complete: true
    });
    let todo2 = new Todo({
      title: 'todo 2',
      complete: false
    });
    service.create(todo1);
    service.create(todo2);
    expect(service.getAll()).toEqual([todo1, todo2]);
  });
  it('should return todo by id', () => {
    const service: TodoRepositoryService = TestBed.get(TodoRepositoryService);

    let todo1 = new Todo({
      title: 'todo 1',
      complete: true
    });
    let todo2 = new Todo({
      title: 'todo 2',
      complete: false
    });
    service.create(todo1);
    service.create(todo2);
    expect(service.getById(1)).toEqual(todo1);
    expect(service.getById(2)).toEqual(todo2);
  });
  it('should return undefined', () => {
    const service: TodoRepositoryService = TestBed.get(TodoRepositoryService);

    let todo1 = new Todo({
      title: 'todo 1',
      complete: true
    });
    let todo2 = new Todo({
      title: 'todo 2',
      complete: false
    });
    service.create(todo1);
    service.create(todo2);
    expect(service.getById(3)).toBeUndefined();
  });
  it('should return empty', () => {
    const service: TodoRepositoryService = TestBed.get(TodoRepositoryService);
    expect(service.getAll()).toEqual([]);
  });
});

describe('test delete todo by id', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('test delete todos', () => {
    const service: TodoRepositoryService = TestBed.get(TodoRepositoryService);

    let todo1 = new Todo({
      title: 'todo 1',
      complete: true
    });
    let todo2 = new Todo({
      title: 'todo 2',
      complete: false
    });
    service.create(todo1);
    service.create(todo2);
    expect(service.getAll()).toEqual([todo1, todo2]);
    service.delete(1);
    expect(service.getAll()).toEqual([todo2]);
    service.delete(2);
    expect(service.getAll()).toEqual([]);
  });
  it('should not delete any todo if id not exist', () => {
    const service: TodoRepositoryService = TestBed.get(TodoRepositoryService);

    let todo1 = new Todo({
      title: 'todo 1',
      complete: true
    });
    let todo2 = new Todo({
      title: 'todo 2',
      complete: false
    });
    service.create(todo1);
    service.create(todo2);
    service.delete(3);
    expect(service.getAll()).toEqual([todo1, todo2]);
  });
});


describe('test update todo', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  it('should return null if id is not exist', () => {
    const service: TodoRepositoryService = TestBed.get(TodoRepositoryService);

    let todo = new Todo({
      title: 'todo',
      complete: true
    });
    service.create(todo);
    let newTodo = service.updateById(2,todo);
    expect(newTodo).toEqual(null);

  });
  it('should return new todo with new title', () => {
    const service: TodoRepositoryService = TestBed.get(TodoRepositoryService);

    let todo = new Todo({
      title: 'todo',
      complete: true
    });
    service.create(todo);
    todo.title = 'title changed';
    let newTodo = service.updateById(1,todo);
    expect(newTodo.title).toEqual('title changed');
  });
  it('should return new todo with complete status', () => {
    const service: TodoRepositoryService = TestBed.get(TodoRepositoryService);

    let todo = new Todo({
      title: 'todo ',
      complete: true
    });
    service.create(todo);
    todo.complete = false;
    let newTodo = service.updateById(1,todo);
    expect(newTodo.complete).toEqual(false);
  });
});

