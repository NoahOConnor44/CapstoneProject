import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(
    private http: HttpClient,
    //private auth: AuthService,
  ) { }

  //Add review game 
  addReview(gameTitle) {
    return this.http.post<any>("/api/addGame", {
      gameTitle,
    });
  }
}
