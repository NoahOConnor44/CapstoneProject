import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(
    private http: HttpClient,
    private User: UserService,
  ) { }

  //Add review game 
  addReview(title, reviewText) {
    
    //declare string containing cookie name
    let cookieName = "jwt";
    let token = this.User.getCookie(cookieName);

    return this.http.post<any>("/api/review/add", {
      title, reviewText, token
    });
  }

  // Retrieve reviews for a certain gametitle.
  public getReview(gameTitle){
    return this.http.post<any>("/api/review/load", {
      gameTitle,
    });
  }

  // Retrieve reviews for a certain user.
  public getUserReview(username){
    return this.http.post<any>("/api/review/loadByUser", {
      username,
    });
  }

}