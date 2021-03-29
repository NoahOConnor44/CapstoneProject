import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  // Method for loading game info by sending game title to api
  register(userInfo) {
    return this.http.post<any>("/api/user/register", {
      userInfo,
    });
  }

  // Method for loading game info by sending game title to api
  login(userInfo) {
    return this.http.post<any>("/api/user/login", {
      userInfo,
    });
  }

}
