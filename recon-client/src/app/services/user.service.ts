import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  // Method for registering a user by sending in userInfo
  register(userInfo) {
    return this.http.post<any>("/api/user/register", {
      userInfo,
    });
  }

  // Method for logging in by sending userInfo
  login(userInfo) {
    return this.http.post<any>("/api/user/login", {
      userInfo,
    });
  }

}
