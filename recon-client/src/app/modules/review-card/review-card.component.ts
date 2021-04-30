import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ReviewModel } from "src/app/models/review-model";

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent implements OnInit {

  @Input() public reviews: ReviewModel;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.reviews.link = "/user/view/" + this.reviews.user;
  }
}
