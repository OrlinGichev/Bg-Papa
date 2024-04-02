import { Component, ViewChild} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {

  @ViewChild("newPostForm") newPostForm: FormGroup;


  constructor(private fb: FormBuilder, private afs : AngularFirestore){

    this.newPostForm = this.fb.group({
    title: [''],
    category: [''],
    text: ['']
  });
}

savePost(): void {
  const post = {
    title: this.newPostForm.value.title,
    category: this.newPostForm.value.category,
    text: this.newPostForm.value.text,
    _id: this.afs.createId()
  };
  
  this.afs.collection('posts').doc(post._id).set(post);
  this.resetForm();
}
resetForm(): void {
  this.newPostForm.reset();
}

submitForm(): void {
  this.savePost();
}
}




