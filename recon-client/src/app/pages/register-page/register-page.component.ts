import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { UserModel } from "src/app/models/user-model";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'register-login-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

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
  register(): void 
  {
    this.http.post('https://localhost:4200/api/user/register', this.form.getRawValue())
    .subscribe(res => {
      if(res)
      {
        let response = JSON.stringify(res);
        if(response.includes("false"))
        {
          alert("Please enter a valid email and a password with 8 characters, 1 lowercase, 1 uppercase, and at least one number.")
        }
        else
        {
          this.router.navigate(['/login']); // send them to the login page after registering
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