import { Component } from '@angular/core';
import { PostService } from '../posts/post.service';
import { Post } from '../types/post';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {


  constructor(private postService: PostService) {}

  getPostsByCategory(category: string): void {
    this.postService.getPostsByCategory(category).subscribe(
      (posts: Post[]) => {
        console.log(`Posts for category ${category}:`, posts);
      },
      (error: any) => {
        console.error('Error fetching posts by category:', error);
      }
    );
  }
}
