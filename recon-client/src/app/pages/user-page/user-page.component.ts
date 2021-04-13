import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import { Router } from "@angular/router";
import { UserModel } from "src/app/models/user-model";
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  public userInfo: UserModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private User: UserService,
  ) { }

  async getUser(): Promise<Number> {
    this.userInfo = new UserModel();
    this.User.viewUser().subscribe((data) =>
    {
      if(data.success)
      {
        data.wishlist.shift();
        console.log(data);
        this.userInfo.username = data.username;
        this.userInfo.wishlist = data.wishlist;
        console.log(this.userInfo.wishlist[0]);
      }
      Promise.resolve(0);
    }
  )
  return;
  };

  async ngOnInit(): Promise<void> {
    await this.getUser();
    Promise.resolve();
  }
}