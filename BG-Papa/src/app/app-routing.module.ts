import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { NewPostComponent } from './posts/new-post/new-post.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home'}, 
  {path: 'home', component: HomeComponent},
  {path: 'new', component: NewPostComponent},
  {path: '**', redirectTo: '/404'},
  {path: '404', component: ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
