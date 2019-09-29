import { Component, OnInit } from '@angular/core';
import {Todo} from './Todo';
import {TodoService} from './todo.service'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})

export class TodosComponent implements OnInit {

  todos:Todo[]
  updateMode:Boolean=false;
  todo:Todo;
  title:string=""

  getTodos(): void {
    this.todoService.getTodos()
      .subscribe(todos =>{
        this.todos = todos
        console.log(this.todos);
      });
  }
  onAddTodo():void{
    console.log('here');
    let title = this.title.trim();
    if (!this.title) { return; }
    this.todoService.addTodo({title} as Todo)
      .subscribe(todo => {
        this.title=''
        this.getTodos();
      });
  }

  updatePressed(todo):void{
    this.todo=todo;
    this.updateMode=true;
  }

  onUpdateCancel():void{
    this.todo=null;
    this.updateMode=false;
  }
  onUpdateTodo():void{
    this.todoService.updateTodo(this.todo)
      .subscribe(() => {
        this.updateMode=false;
        this.todo=null;    
      });
  }

  onDeleteTodo(todo:Todo):void{
    this.todoService.deleteTodo(todo).subscribe(todo=>{
      this.getTodos();
    });
  }


  constructor(
    private todoService:TodoService
  ) { }
  ngOnInit() {
    this.getTodos();
  }

}
