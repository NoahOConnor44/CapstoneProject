import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient,
  ) { }

  // Method for loading game info by sending game title to api
  getGame(gameTitle) {
    return this.http.post<any>("/api/game/load", {
      gameTitle,
    });
  }

  // Method for loading game info by sending game title to api
  search(gameTitle) {
    return this.http.post<any>("/api/game/search", {
      gameTitle,
    });
  }

}
