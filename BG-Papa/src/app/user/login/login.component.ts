import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private UserService: UserService, private router: Router){}

  login(form: NgForm){
    if (form.invalid){
      return
    }
    this.UserService.login(form.value.email, form.value.password).subscribe((isLoggedIn) =>{
      if (isLoggedIn){
        console.log('Login successful');
      } else{
        console.log('Login failed');
      }
    });
    this.router.navigate(['/home']);
  }
}
