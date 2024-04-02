import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { MainComponent } from './main/main.component';
import { CurrentPostComponent } from './posts/current-post/current-post.component';
// import { LoginComponent } from './user/login/login.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home'}, 
  {path: 'home', component: HomeComponent},
  // {path: 'login', component: LoginComponent},
  {path: 'posts', component: MainComponent},
  { path: 'posts/:id',component: CurrentPostComponent,

   },
  {path: '**', redirectTo: '/404'},
  {path: '404', component: ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
