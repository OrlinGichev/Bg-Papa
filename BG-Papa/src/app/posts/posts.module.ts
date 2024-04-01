import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NewPostComponent } from './new-post/new-post.component';
import { PostRoutingModule } from './post-routing.module';
import { CurrentPostComponent } from './current-post/current-post.component';




@NgModule({
  declarations: [
    NewPostComponent,
    CurrentPostComponent
  ],
  imports: [
    CommonModule, FormsModule, SharedModule, PostRoutingModule
  ]
})
export class PostsModule { }
