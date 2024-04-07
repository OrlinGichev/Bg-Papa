import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {

  @Input() post: any;
  username: string='';
  currentDate: Date= new Date;
  commentText: string='';

  constructor(private router: Router, private postService: PostService) {}

  @Input() comments: any[] = [];

  saveComment(): void {
    const newComment = {
      author: this.username,
      date: this.currentDate,
      text: this.commentText
    };

    const postId = this.post.id;

    this.post.comments.push(newComment);
 
    this.postService.updatePost(postId, newComment).then(() => {
      console.log('Updated post is successfull')
    }).catch(error => {
     console.log(error);
    });
      this.router.navigate(['/post', this.post.id]);
    };
  

  cancel(): void {
    this.router.navigate(['/post', this.post.id]);
  }
}
