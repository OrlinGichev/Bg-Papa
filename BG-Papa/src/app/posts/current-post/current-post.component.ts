import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
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

  constructor(private apiService:ApiService, private route:ActivatedRoute, private userService: UserService) {}

  ngOnInit():void {    
    this.route.params.subscribe(data=> {
      this.postId = data['id'];
    });
    this.route.params.subscribe(params => {    
      this.apiService.getCurrentPost(this.postId).subscribe(
        post => {    
          this.post = post
        })
    });
    this.userId = this.userService.getUserKeyFromLocalStorage("_id");
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
