import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:4000/todos'; 

  getTasks() {
    return axios.get(this.apiUrl, this.getAuthConfig());
  }

  addTask(task:{task:string}) {
    return axios.post(this.apiUrl, task, this.getAuthConfig());
  }

  updateTask(taskId:number) {

    const url = `${this.apiUrl}/${taskId}`;
    return axios.put(url, null,this.getAuthConfig());
  }
  deleteTask(taskId:number){
    const url = `${this.apiUrl}/${taskId}`;
    return axios.delete(url, this.getAuthConfig());
  }

  private getAuthConfig() {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    return {
      headers: {
        'Authorization': 'Basic ' + btoa(`${username}:${password}`)
      }
    };
  }
}
