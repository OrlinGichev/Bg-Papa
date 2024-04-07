import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Comment } from 'src/app/types/Comment';
import { Post } from 'src/app/types/post';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-current-post',
  templateUrl: './current-post.component.html',
  styleUrls: ['./current-post.component.css']
})
export class CurrentPostComponent implements OnInit {

  post = {} as Post ;
  postId: string = '';
  userId: string | undefined;
  isSubscribed : boolean = false; 
  originalPostData = {} as Post;
  editingPost = false;
  comments: Comment[] = [];

  constructor(private apiService:ApiService, private route:ActivatedRoute, private userService: UserService, private firestore : AngularFirestore, private router: Router) {}

  ngOnInit():void {    
    this.route.params.subscribe(data=> {
      this.postId = data['id'];
      this.getPostComments();
    });
    this.route.params.subscribe(params => {    
      this.apiService.getCurrentPost(this.postId).subscribe(
        post => {    
          this.post = post
        })
    });
    this.userId = this.userService.getUserKeyFromLocalStorage("_id");
  }

  editPost() {
    this.editingPost = true;
    this.originalPostData = {...this.post};
  }

  cancelEdit() {
    this.editingPost = false;
    this.post = {...this.originalPostData};
  }

  saveChanges() {
    this.firestore.collection('posts').doc(this.postId).update(this.post).then(() => {
      console.log("Post successfully updated!");
      this.editingPost = false; 
    }).catch((error) => {
      console.error("Error updating post: ", error);
    });
  }

  deletePost() {
    if(confirm("Are you sure you want to delete this post?")) {
      this.firestore.collection('posts').doc(this.postId).delete().then(() => {
        console.log("Post successfully deleted!");
      this.router.navigate(['/posts']);
      }).catch((error) => {
        console.error("Error removing post: ", error);
      });
    }
  } 

  getPostComments() {
    this.apiService.getPostComments(this.postId).subscribe(comments => {
      this.comments = comments;
    });
  }

  subscribe(){
    this.isSubscribed = true;
    return this.isSubscribed;
  }

  unsubscribe(){
    this.isSubscribed = false;
    return this.isSubscribed;
  }  

}
