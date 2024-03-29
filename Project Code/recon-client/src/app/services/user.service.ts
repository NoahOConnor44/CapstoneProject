import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedInStatus = false;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  setToken(token) {
    this.cookieService.set("jwt", token, {path: "/"});
  }

  //function retrieves existing cookie on browser, returns "" if no existing cookie
  getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  getIsLoggedIn() {
    //declare string containing cookie name
    let cookieName = "jwt";
    let token = this.getCookie(cookieName);

    if (token != "") {
      this.loggedInStatus = true;
      console.log("Token found in browser when logging in: ", token);
    } else {
      this.loggedInStatus = false;
    }

    return this.loggedInStatus;
  }

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

  logout() {
    this.cookieService.delete("jwt");
  }

  addToWishlist(gameTitle) {
    //declare string containing cookie name
    let cookieName = "jwt";
    let token = this.getCookie(cookieName);

    console.log("Made it to addToWishlist user function call \n");
    return this.http.post<any>("/api/user/addToWishlist", {
      gameTitle, token
    });
  }

  viewUser() {
    let cookieName = "jwt";
    let token = this.getCookie(cookieName);

    return this.http.post<any>("/api/user/view", {
      token
    });
  }
}
