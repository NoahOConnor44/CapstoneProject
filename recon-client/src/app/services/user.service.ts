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

  //function retrieves existing cookie on browser, returns "" if no existing cookie
  getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    console.log("This cookie service gets cookie name: ", cookieName, this.cookieService.get(cookieName));
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
    
    console.log("Cookie:", document.cookie);

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
}
