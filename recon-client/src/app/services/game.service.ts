import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
//import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient,
    //private auth: AuthService,
  ) { }

  // Method for loading game info by sending game title to api
  getGame(gameTitle) {
    return this.http.post<any>("/api/loadGame", {
      gameTitle,
    });
  }

}
