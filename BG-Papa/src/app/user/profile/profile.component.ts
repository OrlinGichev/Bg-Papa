import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserForAuth } from 'src/app/types/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit  {

  userData = {} as UserForAuth;
  editedUserData : any = {};
  isEditing : boolean = false;

  constructor(private userService: UserService, private router: Router){}

  ngOnInit(): void {
    const storeUserData = localStorage.getItem('currentUser');
    if (storeUserData) {
      this.userData = JSON.parse(storeUserData) ;
      this.editedUserData = {...this.userData};
    }
  }

  editProfile(): void {
    this.isEditing = true;
  }

  saveChanges(): void {
    this.userData = {...this.editedUserData};
    this.isEditing = false;
    localStorage.setItem('currentUser', JSON.stringify(this.userData));
  }


  // name:string | undefined = this.userService.getUserKeyFromLocalStorage('username');
  // email:string | undefined = this.userService.getUserKeyFromLocalStorage('email');
  // interests:string | undefined = this.userService.getUserKeyFromLocalStorage('interests');

  
}
