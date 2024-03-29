import {angular} from './../lib/angular.es6'
import {Todo} from './../models/todo'

var STORAGE_ID = 'ATSCRIPT_TODO_V1';

export class TodoStorage {
  //public todos:Array<Todo>
  //public localStorage:LocalStorage
  constructor() {
    this.todos = [];
    this.localStorage = window.localStorage;
  }

  clearCompleted() {
    var completeTodos = [], incompleteTodos = [];

    this.todos.forEach(function (todo) {
      if (todo.completed) {
        completeTodos.push(todo);
      } else {
        incompleteTodos.push(todo);
      }
    });
    angular.copy(incompleteTodos, this.todos);
    this._saveToLocalStorage(this.todos);
  }

  delete(todo:Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
    this._saveToLocalStorage(this.todos);
  }

  load(completeCallback:Function) {
    "use strict";
    if (this._isInLocalStorage()) {
      this.todos = this._getFromLocalStorage();
      completeCallback(this.todos);
    } else {
      // First time app launch. Seed todos from todo_data.json.
      this.todos = [{
        'name': 'Name1',
        'description': 'Description1',
        'owner': 'Owner1',
        'dueDate': 'Date1',
        'priority': 'Priority1',
        'isCompleted': false
      }];
      completeCallback(this.todos);
    }
  }

  insert(todo:Todo) {
    this.todos.push(todo);
    this._saveToLocalStorage(this.todos);
  }

  put(todo:Todo, index:number) {
    this.todos[index] = todo;
    this._saveToLocalStorage(this.todos);
  }

  _getFromLocalStorage():Array {
    return JSON.parse(this.localStorage.getItem(STORAGE_ID) || '[]').
        map(data => new Todo(data.name, data.completed));
  }

  _isInLocalStorage():boolean {
    "use strict";
    return !!this.localStorage.getItem(STORAGE_ID);
  }

  _saveToLocalStorage(todos:Array) {
    this.localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
  }
}