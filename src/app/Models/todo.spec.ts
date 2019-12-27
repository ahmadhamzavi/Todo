import { Todo } from './todo';

describe('Todo', () => {
  it('should create an instance', () => {
    expect(new Todo()).toBeTruthy();
  });
  it('new todo with values in constractor',()=>
  {
    let todo=new Todo({
      title:'check create todo objct',
      complete:true
    });
    expect(todo.title).toEqual('check create todo objct');
    expect(todo.complete).toEqual(true);
  })
});
