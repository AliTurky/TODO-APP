import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  newTask: string = '';
  username: string='';
  userAvatar: string='';


  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.loadTasks();
    this.username = localStorage.getItem('username')!;
    this.userAvatar = localStorage.getItem('avatar')!;
    console.log(this.userAvatar);

  }

  loadTasks() {
    this.taskService.getTasks()
      .then(response => {
        this.tasks = response.data;
      })
      .catch(error => {
        console.error('Error loading tasks:', error);
      });
  }

  logout(){
    localStorage.setItem('username', '');
    localStorage.setItem('password', '');



    this.router.navigate(['/login']);
  }
  addTask() {
    if (this.newTask.trim() !== '') {
      this.taskService.addTask({ task: this.newTask })
        .then(response => {
          this.tasks.push(response.data);
          this.newTask = '';
        })
        .catch(error => {
          console.error('Error adding task:', error);
        });
    }
  }

  updateTask(id:number) {
    this.taskService.updateTask(id)
      .then(response => {

      })
      .catch(error => {
        console.error('Error updating task:', error);
      });
  }
  deleteTask(id:number){
    this.taskService.deleteTask(id)
    .then(response => {

    })
    .catch(error => {
      console.error('Error deleting task:', error);
    });
  }
}
