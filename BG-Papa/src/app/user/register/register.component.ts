import { Component, ViewChild, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { addDoc, collection } from 'firebase/firestore';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  @ViewChild("registerForm") registerForm : any;
  firestore:Firestore = inject(Firestore);

  password:string = "";
  confirmPassword:string = "";
  isMatch:boolean = true;

  constructor(private router:Router){}

  saveUser(): void {
    const userCollectioin = collection(this.firestore,'users');
    const payload = {
      'username': this.registerForm.value.username,
      'email': this.registerForm.value.email,
      'password': this.registerForm.value.password
    }
    addDoc(userCollectioin, payload);
  }

  resetUser(): void {
    this.registerForm.reset({
      'username': '',
      'email': '',
      'password': '',
      'confirm_password': '',
    });
  };

  checkPasswordMatch() {
    this.isMatch = this.password === this.confirmPassword;
  };

  submitForm() : void{
    if (this.password !== this.confirmPassword) {
      this.isMatch = false;
    } else {
        this.isMatch = true;
        this.saveUser();
        this.resetUser();
        this.router.navigate(['/login']);
    }
  }
}
