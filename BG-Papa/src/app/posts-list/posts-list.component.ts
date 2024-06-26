import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Post } from '../types/post';
import { UserService } from '../user/user.service';
import { UserForAuth } from '../types/user';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit{

  posts : Post[] | null = [];
  currenetPost: Post | null = null;
  isLoading : boolean = true;
  get isLoggedIn(): boolean {
    const storedUser = localStorage.getItem('currentUser');
    return !!storedUser;
  }

  constructor (private api: ApiService, private userService: UserService) {}

  user: UserForAuth | undefined;
  

  get userId(): string {
    return this.userService.user?._id || '';
  }



  ngOnInit (): void{    

    this.userService.getUserObservable().subscribe(user => {
      
    })
      this.api.getPostsList().subscribe(posts =>{      
        this.posts = posts;   
        this.isLoading = false;
      })
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
