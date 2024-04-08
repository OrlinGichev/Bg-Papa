import * as bcrypt from 'bcryptjs';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  @ViewChild("registerForm") registerForm! : FormGroup;

  password:string = "";
  confirmPassword:string = "";
  isMatch:boolean = true;

  constructor(private router:Router, private userService : UserService, private fb: FormBuilder, private afs: AngularFirestore) {
    this.registerForm = fb.group({
      username: [''],
      email: [''],
      password: [''],
      interests: [''],
    });
  }

  async submitForm(): Promise<void> {
    if (this.password !== this.confirmPassword) {
      this.isMatch = false;
      return;
    }

    const username = this.registerForm.value.username;
    const email = this.registerForm.value.email;
    const userExists = await this.userService.checkUserExists(username, email).toPromise();
    if (userExists) {
      alert('Username or email already exists');
      return;
    }

    // Хеширане на паролата
    const hashedPassword = await bcrypt.hash(this.registerForm.value.password, 10);

    const user = {
      username: username,
      email: email,
      password: hashedPassword,
      interests: this.registerForm.value.interests,
      _id: this.afs.createId(),
    };

    this.afs.collection('users').doc(user._id).set(user)
      .then(() => {
        console.log('User registered successfully');
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.error('Error registering user:', error);
        alert('An error occurred during registration');
      });
  }

  checkPasswordMatch(): void {
    this.isMatch = this.password === this.confirmPassword;
  };
}
