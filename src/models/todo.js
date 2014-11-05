export class Todo {
  //public title:string
  //public completed:boolean
  constructor(name:string, completed:boolean) {
    this.name = name;
    this.completed = completed;
  }

  clone():Todo {
    return new Todo(this.name, this.completed);
  }

}