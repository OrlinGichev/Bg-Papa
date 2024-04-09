# Project documentation
## Overview
  This is an Angular app, called **BG Papa** that is a discussion forum for the most common topics men talk about. The topics are divided into three categories - cars, repair and sports.

  
![homepage image](Homepage.png)


## Instalation

  npm install  
  ng serve
  
## Backend

  Firestore Database
  
## Home page

  public part **without authentication** that is visible :
  
    home -> homepage  
    posts -> all post without *Detail* button, but you can see : title, category, created at, author, number of subscribers, number of comments for every post  
    login -> login page  
    register -> register page  
    aside bar shows information about number of posts for each category : Cars, Repair, Sport 

    

  private part **with authentication** that is visible : 
  
    posts -> all posts with *Detail* button  
    new post -> login user can add new post  
    profile : *username* -> user can see profile information with **edit** button / edit mode user can save / cancel interests

## Registration page 

  user has to fill :  
  
    Username  
    Email  
    Interests  
    Password  
    Repeat password

## Login page

  login part is with email and password

## Detail page

  only user that is author of post :  
  
    edit post button  
    delete post button  
    add comment

  only user that is not author of post :  

    subscribe post button  
    add comment  

  for each post user can see all of comments with author of comment and date of comment

## New post page 

  only login user can add new post
  user has to fill **title**, choose **category** only from 3 category - cars, repair and sport, **content**
    
