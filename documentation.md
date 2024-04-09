# Project documentation
## Overview
  This is an Angular app, called **BG Papa** that is a discussion forum for the most common topics men talk about. The topics are divided into three categories - cars, repair and sports. Every post has comments and users can discuss post and subscribe for them. 

  
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

![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34) 
![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white) 
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) 
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
