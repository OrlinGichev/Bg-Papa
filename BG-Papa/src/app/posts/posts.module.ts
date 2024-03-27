import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PostsListComponent } from './posts-list/posts-list.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostRoutingModule } from './post-routing.module';




@NgModule({
  declarations: [
    PostsListComponent,
    NewPostComponent
  ],
  imports: [
    CommonModule, FormsModule, SharedModule, PostRoutingModule
  ]
})
export class PostsModule { }
