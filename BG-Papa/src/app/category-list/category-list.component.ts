import { Component, OnInit } from '@angular/core';
import { PostService } from '../posts/post.service';
import { Post } from '../types/post';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  autoPostCount: number = 0;
  repairPostCount: number = 0;
  sportPostCount: number = 0;


  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getPostCountByCategory('cars').subscribe(count => {
      this.autoPostCount = count;
    });

    this.apiService.getPostCountByCategory('repair').subscribe(count => {
      this.repairPostCount = count;
    });

    this.apiService.getPostCountByCategory('sports').subscribe(count => {
      this.sportPostCount = count;
    });
  }
}
