import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../post.service';
import { Comment } from 'src/app/types/Comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() userId!: string ;
  @Input() postId: string = '';
  username: string='';
  currentDate: Date= new Date;
  commentText: string='';
  comments: Comment[] = [];

  constructor(private router: Router, private postService: PostService) {}

  ngOnInit(): void {
    this.getPostComments();
  }

  getPostComments() {
    this.postService.getPostComments(this.postId).subscribe(comments => {
      this.comments = comments;
    
    });
    
  }

  saveComment(): void {
    const newComment = {
      author: this.username,
      date: this.currentDate,
      text: this.commentText,
      postId: this.postId,
      author_id: this.userId,
    };

    this.postService.addCommentToPost(this.postId, newComment).then(() => {
      this.getPostComments(); 
    });
  }

  cancel(): void {
    this.commentText = "";
  }

  formatTimestamp(timestamp: any): string {
    if (timestamp && timestamp.seconds && timestamp.nanoseconds) {
      const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
      const date = new Date(milliseconds);
      return date.toLocaleDateString(); 
    } else {
      return 'Invalid date';
    }
  }
}
