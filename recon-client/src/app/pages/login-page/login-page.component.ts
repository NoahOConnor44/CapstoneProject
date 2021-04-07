import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { UserModel } from "src/app/models/user-model";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public user: UserModel = {
    email: "",
    password: "",
    username: "",
    private: false
  };

  form: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private User: UserService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) { 
    console.log("User is logged in: ", this.User.getIsLoggedIn());
    if(this.User.getIsLoggedIn()) {
      this.router.navigate(["/"]);
    }
  }

  login(): void 
  {
    this.http.post('https://localhost:4000/user/login', this.form.getRawValue(), {
      withCredentials: true // for front end cookie use.
    })
    .subscribe(res => {
      if(res)
      {
        let response = JSON.parse(JSON.stringify(res));
        if(JSON.stringify(res).includes("false"))
        {
          // If the result of the request has success: false, then they didnt login correctly. Notify the user.
          alert("Wrong credentials provided. Please try again");
        }
        else
        {
          console.log("User logged in with response: ", response);
          this.User.setToken(response.token);
          // Succesfully logged in. The cookie was created. Navigate them to the homepage to use the website.
          this.router.navigate(['']);
        }
      }
    });
  }

  ngOnInit(): void 
  {
    this.form = this.formBuilder.group( {
      email: "",
      password: ""
    })
  }

}
