import { Component, ViewChild} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForAuth } from 'src/app/types/user';
import { UserService } from 'src/app/user/user.service';




@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {

  @ViewChild("newPostForm") newPostForm: FormGroup;


  constructor(private fb: FormBuilder, private afs : AngularFirestore, private userService: UserService, private router: Router){

    this.newPostForm = this.fb.group({
    title: [''],
    category: [''],
    text: ['']
  });
}

currentUser: UserForAuth | undefined


savePost(): void {
  this.userService.getUserObservable().subscribe((user) => {
    this.currentUser = user;
  })
  const post = {
    title: this.newPostForm.value.title,
    category: this.newPostForm.value.category,
    text: this.newPostForm.value.text,
    authorName: this.currentUser?.username,
    authorId: this.currentUser?._id,
    _id: this.afs.createId(),
    created_at: new Date(),
    comments: [],
    subscribers: [],
  };
  
  this.afs.collection('posts').doc(post._id).set(post);
  this.resetForm();

}
resetForm(): void {
  this.newPostForm.reset();
}

submitForm(): void {
  this.savePost();
  this.router.navigate(['/posts']);
}
}




