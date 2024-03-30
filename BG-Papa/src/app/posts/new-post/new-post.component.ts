import { Component, ViewChild, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {

  @ViewChild("newPostForm") newPostForm: any;

  firestore:Firestore = inject(Firestore);

  savePost() : void {
    const postCollection = collection(this.firestore, 'posts');
    addDoc(postCollection, {
      'title': this.newPostForm.value.title,
      'category' : this.newPostForm.value.category,
      'content': this.newPostForm.value.content
    });
  }

  resetForm(): void {
    this.newPostForm.reset({
      'title': '',
      'category' : '',
      'content': ''
    });
  }

  submitForm(): void {      
      this.savePost();
      this.resetForm();
    }
}


//   resetUser(): void {
//     this.registerForm.reset({
//       'username': '',
//       'email': '',
//       'password': '',
//       'confirm_password': '',
//     });
//   }

//   submitForm() : void{
//     alert(this.registerForm.value.username);
//     this.saveUser();
//     this.resetUser();
//   }
// }

