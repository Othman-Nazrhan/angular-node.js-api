import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/moduls/task';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  
  searchText:"";

  editForm=false;
  showFrom=false;

  tasks: Task[] = [];
  resultTasks: Task[] = [];
  
  myTask :Task = {
    label :"",
    completed :false
  }

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.findAll()
      .subscribe(tasks => {
       this.resultTasks = this.tasks = tasks
      });
  }

  deleteTask(id) {
    this.taskService.delete(id)
      .subscribe(() => {
        this.tasks = this.tasks.filter(task => task.id != id)
      })
  }


  persisTask(){
    this.taskService.persist(this.myTask)
    .subscribe((task) => {
      this.tasks = [task, ...this.tasks]
      this.resetTask();
      this.showFrom =false;
    })
    
  }
toggelCompleted(task){
  this.taskService.completed(task.id ,task.completed)
  .subscribe(() => {
  task.completed =! task.completed 

  });
}

  resetTask(){
    this.myTask = {
      label :'',
      completed : false

    }
  }
editTask(task){
  this.myTask = task
  this.editForm =true
}

updateTask(){
  this.taskService.update(this.myTask)
  .subscribe(task =>{
    this.resetTask();
    this.editForm =false;

  })
}
searchTask(){
this.resultTasks = this.tasks.filter((task) =>task.label.toLowerCase().includes(this.searchText.toLowerCase()) )
}

   
}
