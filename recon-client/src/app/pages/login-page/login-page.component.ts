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
    password: ""
  };

  form: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private User: UserService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) { }

  // npm install jose. most secure jwt library according to jwt.io
  login(): void 
  {
    this.http.post('https://localhost:4200/api/user/login', this.form.getRawValue())
    .subscribe(res => {
      if(res)
      {
        let response = JSON.stringify(res);
        if(response.includes("false"))
        {
          alert("Wrong credentials provided. Please try again")
        }
        else
        {
          this.router.navigate(['']); // send them to the home page after login
          // we will deal with token here.
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
