import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private userService: UserService){}

  name:string | undefined = this.userService.getUserKeyFromLocalStorage('username');
  email:string | undefined = this.userService.getUserKeyFromLocalStorage('email');
  interests:string | undefined = this.userService.getUserKeyFromLocalStorage('interests');

  
}
