import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Post } from 'src/app/types/post';

@Component({
  selector: 'app-current-post',
  templateUrl: './current-post.component.html',
  styleUrls: ['./current-post.component.css']
})
export class CurrentPostComponent implements OnInit {

  post = {} as Post ;
  postId: string = ''; 

  constructor(private apiService:ApiService, private route:ActivatedRoute) {}

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
  }

}
