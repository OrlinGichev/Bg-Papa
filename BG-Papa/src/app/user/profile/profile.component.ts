import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserForAuth } from 'src/app/types/user';
import { Router } from '@angular/router';
import { map } from 'rxjs';

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

  cancelEdit(): void {
    this.isEditing = false;
    this.editedUserData = {...this.userData}; // Restore original data
  }

  saveChanges(): void {
    const userId = this.userData._id;
    const newInterests = this.editedUserData.interests;
  
    this.userService.updateInterests(userId, newInterests).subscribe(() => {
      
      this.userData.interests = newInterests;
      this.isEditing = false;
      localStorage.setItem('currentUser', JSON.stringify(this.userData));
    }, (error) => {
      console.error('Error updating user interests:', error);
    });
  } 

  
}
