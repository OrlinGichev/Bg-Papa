import { Component, ViewChild, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  @ViewChild("registerForm") registerForm : any;
  firestore:Firestore = inject(Firestore);

  saveUser(): void {
    const userCollectioin = collection(this.firestore,'users');
    addDoc(userCollectioin, {
      'username': this.registerForm.value.username,
      'email': this.registerForm.value.email,
      'password': this.registerForm.value.password
    });
  }

  resetUser(): void {
    this.registerForm.reset({
      'username': '',
      'email': '',
      'password': '',
      'confirm_password': '',
    });
  }

  submitForm() : void{
    alert(this.registerForm.value.username);
    this.saveUser();
    this.resetUser();
  }
}
