import { Component, OnInit } from '@angular/core';
import { ReviewModel } from "src/app/models/review-model";
import { ReviewsService } from 'src/app/services/reviews.service';
import { UserModel } from "src/app/models/user-model";
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  public reviews: ReviewModel;

  public userInfo: UserModel;

  constructor(
    private Review: ReviewsService,
    private User: UserService,
  ) { }

  async displayUserReviews(): Promise<Number>
  {
    this.Review.getUserReview(this.userInfo.username).subscribe((data) => {
      if (data.success) {
        this.reviews = data.reviews;
      } else {
        alert(
          "The game reviews could not be retrieved from the database."
        );
      }
      Promise.resolve(0);
    });
    return;
  }

  async getUser(): Promise<Number> {
    this.userInfo = new UserModel();
    this.User.viewUser().subscribe((data) =>
    {
      console.log(data);
      if(data.success)
      {
        data.wishlist.shift();
        this.userInfo.username = data.username;
        this.userInfo.wishlist = data.wishlist;
        this.displayUserReviews();
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