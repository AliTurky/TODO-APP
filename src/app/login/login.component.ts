import { Component } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent {


  username: string = '';
  password: string = '';
  avatar:string = '';
  showError: boolean = false;
  showSuccess: boolean = false;
  users: any[] = [];

  selectedUsername: string = ''
   userExists = false;

  constructor(private router: Router) {}

  async ngOnInit() {
    try {
      const response = await axios.get('http://localhost:4000/users');
      this.users = response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  async login() {
    interface User {
      username: string;
      password: string;
      avatar:string;
    }
    try {

      const response = await axios.get('http://localhost:4000/users');

          console.log("first time", this.userExists);


      response.data.forEach((user:User) => {

          if(user.username as string === this.selectedUsername as string){
            localStorage.setItem('avatar', user.avatar);

          this.userExists = true;
          }
      });




      if (this.userExists) {

        this.showSuccess = true;
        this.showError = false;


        localStorage.setItem('username', this.selectedUsername);
        localStorage.setItem('password', this.password);


        this.router.navigate(['/tasks']);
      } else {

        this.showSuccess = false;
        this.showError = true;
      }
    } catch (error) {
      console.error('Error logging in:', error);
      
      this.showSuccess = false;
      this.showError = true;
    }
  }

}

