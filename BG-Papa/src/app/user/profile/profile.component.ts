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

  cancelEdit(): void {
    this.isEditing = false;
    this.editedUserData = {...this.userData}; // Restore original data
  }

  saveChanges(): void {
    // Save changes to database (assuming you have a UserService method for this)
    this.userService.updateUserData(this.editedUserData).subscribe(() => {
      // On successful update, update local data and exit edit mode
      this.userData = {...this.editedUserData};
      this.isEditing = false;
      localStorage.setItem('currentUser', JSON.stringify(this.userData));
    }, (error) => {
      console.error('Error updating user data:', error);
      // Handle error, show user appropriate message
    });
  }
  
}
