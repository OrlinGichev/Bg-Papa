import { Component, ViewChild, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { addDoc, collection } from 'firebase/firestore';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  @ViewChild("registerForm") registerForm! : FormGroup;
  firestore:Firestore = inject(Firestore);

  password:string = "";
  confirmPassword:string = "";
  isMatch:boolean = true;

  constructor(private router:Router, private userService : UserService, private fb: FormBuilder, private afs: AngularFirestore){
    this.registerForm = fb.group({
      username: [''],
      email: [''],
      password: [''],
      interests: [''],
    });
  }

  saveUser(): void {
    // const userCollectioin = collection(this.firestore,'users');
    const user = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      interests: this.registerForm.value.interests,
      _id:this.afs.createId(),
    }
    this.afs.collection('users').doc(user._id).set(user)
    // addDoc(userCollectioin, payload);
    this.registerForm.reset();
  }

  // resetUser(): void {
  //   this.registerForm.reset({
  //     'username': '',
  //     'email': '',
  //     'password': '',
  //     'confirm_password': '',
  //   });
  // };

  checkPasswordMatch() {
    this.isMatch = this.password === this.confirmPassword;
  };

  submitForm() : void{
    if (this.password !== this.confirmPassword) {
      this.isMatch = false;
    } else {
        this.isMatch = true;
        this.userService.checkUserExists(this.registerForm.value.username, this.registerForm.value.email);
        this.saveUser();
        // this.resetUser();
        this.router.navigate(['/login']);
    }
  }
}
