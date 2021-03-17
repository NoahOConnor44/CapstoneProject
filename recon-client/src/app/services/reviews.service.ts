import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(
    private http: HttpClient,
  ) { }

  //Add review game 
  addReview(gameTitle) {
    return this.http.post<any>("/api/review/add", {
      gameTitle,
    });
  }
}
