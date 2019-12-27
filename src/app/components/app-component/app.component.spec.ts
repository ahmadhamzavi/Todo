import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { Todo } from 'src/app/Models/todo';
import { By } from '@angular/platform-browser';
import { ToDoComponent } from '../todo-component/to-do.component';
import { TodoRepositoryService } from 'src/app/Services/todo-repository.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let app;
  let compiled;
  let service: TodoRepositoryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
        ToDoComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    app = fixture.debugElement.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    service = TestBed.get(TodoRepositoryService);

  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should currectly instantiated newTodo of type Todo', () => {
    expect(app.newTodo instanceof Todo).toBeTruthy();
  })

  it('should show "ToDo APP" in div with class app-title', () => {
    expect(compiled.querySelector('div .app-title').textContent).toContain('ToDo APP');
  })


});


describe('create todo(AppComponent)', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let app;
  let service: TodoRepositoryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
        ToDoComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    app = fixture.debugElement.componentInstance;
    service = TestBed.get(TodoRepositoryService);

  }));
  //test view
  it('should create a newTodo(test view)', () => {
    const inputElement = fixture.nativeElement.querySelector('#newTodoTitle');
    inputElement.value = 'First Todo';
    inputElement.dispatchEvent(new Event('input'));
    const event = new KeyboardEvent('keyup', { 'key': 'Enter' });
    inputElement.dispatchEvent(event);
    fixture.detectChanges();
    let todoElement = fixture.debugElement.query(By.css('to-do')).nativeElement;
    expect(todoElement).toBeTruthy();
    expect(app.newTodo.title).toEqual('');
  })
  it('should nit create Todo when todo.title is Empthy(test view', () => {
    const inputElement = fixture.nativeElement.querySelector('#newTodoTitle');
    inputElement.value = 'First Todo';
    inputElement.dispatchEvent(new Event('input'));
    const event = new KeyboardEvent('keyup', { 'key': 'Enter' });
    inputElement.dispatchEvent(event);
    fixture.detectChanges();
    let todoElement = fixture.debugElement.query(By.css('to-do')).nativeElement;
    expect(todoElement).toBeTruthy();
    expect(app.newTodo.title).toEqual('');
  })
  // test create method
  it('should create a newTodo and add to todo list in TodoRepositoryService (test create())', () => {
    app.newTodo.title = "Todo";
    app.create();
    let todo = service.getAll();
    fixture.detectChanges();
    expect(todo.length).toEqual(1);
    expect(todo[0].title).toEqual("Todo");
  })
  it('should not create Todo when todo.title is empty(test create())', () => {
    app.newTodo.title = "";
    app.create();
    let todo = service.getAll();
    fixture.detectChanges();
    expect(todo.length).toEqual(0);
  })
});

describe('update todo(AppComponent)', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let app;
  let service: TodoRepositoryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
        ToDoComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    app = fixture.debugElement.componentInstance;
    service = TestBed.get(TodoRepositoryService);

  }));
    // test view
    it('should change todo complete status(test view', () => {
      //create new todo
      const inputElement = fixture.nativeElement.querySelector('#newTodoTitle');
      inputElement.value = 'First Todo';
      inputElement.dispatchEvent(new Event('input'));
      const enterEevent = new KeyboardEvent('keyup', { 'key': 'Enter' });
      inputElement.dispatchEvent(enterEevent);
      fixture.detectChanges();
      let todoElement = fixture.debugElement.query(By.css('to-do')).nativeElement;
      let todos = service.getAll();
      //expect create a new todo
      expect(todos.length).toEqual(1);
      expect(todos[0].title).toEqual("First Todo");
      expect(todos[0].complete).toEqual(false);
      expect(todoElement).toBeTruthy();
      expect(app.newTodo.title).toEqual('');
  
      //update todo 
      let checkBoxElement = fixture.nativeElement.querySelector('input[type="checkbox"]');
      const toggleEvent = new MouseEvent('click');
      checkBoxElement.dispatchEvent(toggleEvent);
      fixture.detectChanges();
      todos = service.getAll();
      expect(checkBoxElement.value).toBe('on');
      expect(todos.length).toEqual(1);
      expect(todos[0].title).toEqual("First Todo");
      expect(todos[0].complete).toEqual(true);
      expect(todoElement).toBeTruthy();
    })
    //test changeTodoCompleteStatus method
    it('should change todo complete status (test changeTodoCompleteStatus())', () => {
      //create new todo
      app.newTodo.title = "Todo";
      app.create();
      const service: TodoRepositoryService = TestBed.get(TodoRepositoryService);
      let todos = service.getAll();
      //expect create a new todo
      expect(todos.length).toEqual(1);
      expect(todos[0].title).toEqual("Todo");
      expect(todos[0].complete).toEqual(false);
      // update todo
      app.changeTodoCompleteStatus(todos[0]);
      todos = service.getAll();
      //expect update first todo (change complete status to True)
      expect(todos.length).toEqual(1);
      expect(todos[0].title).toEqual("Todo");
      expect(todos[0].complete).toEqual(true);
    })
});
describe('delete todo(AppComponent)', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let app;
  let service: TodoRepositoryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
        ToDoComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    app = fixture.debugElement.componentInstance;
    service = TestBed.get(TodoRepositoryService);

  }));
    //test view
    it('should delete todo(test view)', () => {
      const inputElement = fixture.nativeElement.querySelector('#newTodoTitle');
      //create new todo
      inputElement.value = 'First Todo';
      inputElement.dispatchEvent(new Event('input'));
      const enterEevent = new KeyboardEvent('keyup', { 'key': 'Enter' });
      inputElement.dispatchEvent(enterEevent);
      fixture.detectChanges();
      //expect create a new todo
      let todoElement = fixture.nativeElement.querySelector('to-do');
      expect(todoElement).toBeTruthy();
      expect(app.newTodo.title).toEqual('');
  
      //delete by click trash icon
      let deleteElement = fixture.nativeElement.querySelector('i.fa-trash');
      const deleteEvent = new MouseEvent('click');
      deleteElement.dispatchEvent(deleteEvent);
      fixture.detectChanges();
      let todos = service.getAll();
      //expect delete first todo
      expect(todos.length).toEqual(0);
    })
  
    //test deleteTodo method
    it('should delete todo (test deleteTodo())', () => {
      //create new todo
      app.newTodo.title = "Todo";
      app.create();
      let todos = service.getAll();
      //expect create a new todo
      expect(todos.length).toEqual(1);
      expect(todos[0].title).toEqual("Todo");
      expect(todos[0].complete).toEqual(false);
  
      app.deleteTodo(todos[0]);
      todos = service.getAll();
      //expect delete first todo
      expect(todos.length).toEqual(0);
    })
});