import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private UserService: UserService, private router: Router){}

  login(ev: Event, email: string, password: string){
    ev.preventDefault();
    this.UserService.login();
    this.router.navigate(['/home']);
  }
}
