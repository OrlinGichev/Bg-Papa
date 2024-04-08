import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Comment } from 'src/app/types/Comment';
import { Post } from 'src/app/types/post';
import { UserService } from 'src/app/user/user.service';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

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

  constructor(private apiService:ApiService, private route:ActivatedRoute, private userService: UserService, private firestore : AngularFirestore, private router: Router, private postService: PostService) {}

  private subscription: Subscription | undefined;

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(data => {
      this.postId = data['id'];
      this.apiService.getCurrentPost(this.postId).subscribe(
        post => {    
          this.post = post;
          this.getPostComments();
        }
      );
    });
  
    this.userId = await this.userService.getUserKeyFromLocalStorage("_id");
    await this.checkSubscription();  
  }
  
  
  async checkSubscription() {    
    if (this.userId) {
      this.subscription = this.postService.isUserSubscribed(this.postId, this.userId).subscribe(
        (isSubscribed: boolean) => {
          this.isSubscribed = isSubscribed;
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
    this.postService.getPostComments(this.postId).subscribe(comments => {
      this.comments = comments;
    });
  }

  subscribe(){
    if (this.userId) { 
        this.postService.subscribePost(this.postId, this.userId);        
      }    
    }

  unsubscribe(){
    if (this.userId) { 
      this.postService.unsubscribePost(this.postId, this.userId);
      
    }  
  }  
  
}
