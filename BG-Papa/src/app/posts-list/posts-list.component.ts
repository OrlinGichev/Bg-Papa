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
  isLoading : boolean = true;

  constructor (private api: ApiService, private userService: UserService) {}


  get userId(): string {
    return this.userService.user?.id || '';
  }

  isSubscribed : boolean = false;

  ngOnInit (): void{    
      this.api.getPostsList().subscribe(posts =>{
        this.posts = posts;
        this.isLoading = false;
      })
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
