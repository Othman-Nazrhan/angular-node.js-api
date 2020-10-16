import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/moduls/task';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];
  
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
      .subscribe(tasks => this.tasks = tasks);
  }

  deleteTask(id) {
    console.log(this.tasks)

    this.taskService.delete(id)
      .subscribe(() => {
        this.tasks = this.tasks.filter(task => task.id != id)
      })
  }
  persisTask(){
    this.taskService.persist(this.myTask)
    .subscribe((task) => {
      this.tasks = [task, ...this.tasks]
    })
    
  }

}
