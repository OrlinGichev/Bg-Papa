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


    ![JavaScript](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxwYXRoIGZpbGw9IiNmNWRlMTkiIGQ9Ik0yIDJoMjh2MjhIMnoiLz48cGF0aCBkPSJNMjAuODA5IDIzLjg3NWEyLjg2NiAyLjg2NiAwIDAgMCAyLjYgMS42YzEuMDkgMCAxLjc4Ny0uNTQ1IDEuNzg3LTEuM2MwLS45LS43MTYtMS4yMjItMS45MTYtMS43NDdsLS42NTgtLjI4MmMtMS45LS44MDktMy4xNi0xLjgyMi0zLjE2LTMuOTY0YzAtMS45NzMgMS41LTMuNDc2IDMuODUzLTMuNDc2YTMuODg5IDMuODg5IDAgMCAxIDMuNzQyIDIuMTA3TDI1IDE4LjEyOEExLjc4OSAxLjc4OSAwIDAgMCAyMy4zMTEgMTdhMS4xNDUgMS4xNDUgMCAwIDAtMS4yNTkgMS4xMjhjMCAuNzg5LjQ4OSAxLjEwOSAxLjYxOCAxLjZsLjY1OC4yODJjMi4yMzYuOTU5IDMuNSAxLjkzNiAzLjUgNC4xMzNjMCAyLjM2OS0xLjg2MSAzLjY2Ny00LjM2IDMuNjY3YTUuMDU1IDUuMDU1IDAgMCAxLTQuNzk1LTIuNjkxWm0tOS4yOTUuMjI4Yy40MTMuNzMzLjc4OSAxLjM1MyAxLjY5MyAxLjM1M2MuODY0IDAgMS40MS0uMzM4IDEuNDEtMS42NTN2LTguOTQ3aDIuNjMxdjguOTgyYzAgMi43MjQtMS42IDMuOTY0LTMuOTI5IDMuOTY0YTQuMDg1IDQuMDg1IDAgMCAxLTMuOTQ3LTIuNFoiLz48L3N2Zz4=)
