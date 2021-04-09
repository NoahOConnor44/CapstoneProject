import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import { Router } from "@angular/router";
import { GameService } from "src/app/services/game.service";
import { GameModel } from "src/app/models/game-model";
import { ReviewModel } from "src/app/models/review-model";
import { ReviewsService } from 'src/app/services/reviews.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-game-info-page',
  templateUrl: './game-info-page.component.html',
  styleUrls: ['./game-info-page.component.scss']
})

export class GameInfoPageComponent implements OnInit {
  
  // Create game object to hold game info returned from database
  public game: GameModel = {
    title: "",
    description: "",
    genre: "",
    coop: false,
    consoleType: "",
    negativeRating: 0,
    positiveRating: 0,
    link: "",
    recommendations: []
  }

  public review: ReviewModel = {
    title: "",
    reviewText: "",
    user: ""
  }

  public reviewTextInput: string;

  // Create variables for using necessary imports
  constructor(  
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private Game: GameService, 
    private Review: ReviewsService,
    private User: UserService,
  ) {
    this.game.title = this.activatedRoute.snapshot.paramMap.get("game");
    this.game.title = this.game.title.replace(/:/g,'');
  }

  // Method used to display game info on game page
  displayGame() {

    // Retrieve game title information from the URL
    this.game.title = this.activatedRoute.snapshot.paramMap.get("game");

    // Handle game title colons by removing them to load image titles
    this.game.title = this.game.title.replace(/:/g,'');

    // Send game title to angular game.service.ts for routing
    this.Game.getGame(this.game.title).subscribe((data) => {
      if (data.success) {
        console.log(data);
        this.game = data.game;
        this.game.recommendations = data.gameRecommendations;

        // Set title without colon for image retrieval
        this.game.recommendations.forEach(game => {
          game.title = game.title.replace(/:/g,'');
        });

        // Branched statements execute depending on associated game platform type
        if(this.game.consoleType === "123"){
          this.game.consoleType = "All platforms";
        }

        else if(this.game.consoleType === "1"){
          this.game.consoleType = "Xbox";
        }

        else if(this.game.consoleType ==="2"){
          this.game.consoleType = "Playstation";
        }

        else if(this.game.consoleType === "3"){
          this.game.consoleType = "PC";
        }

      } else {
        alert(
          "The game details have not been successfully retrieved from the database."
        );
      }
    });
  }

  displayReviews()
  {
    //TO DO: How to retrieve game title 
    this.game.title = this.activatedRoute.snapshot.paramMap.get("game");

    // Handle game title colons by removing them to load image titles
    this.game.title = this.game.title.replace(/:/g,'');

    let title = this.game.title;

    //send game title to angular game.service.ts for routing
    this.Review.getReview(title).subscribe((data) => {
      if (data.success) {
        console.log(data);
        this.review = data.reviews;
      } else {
        alert(
          "The game review could not be retrieved from the database."
        );
      }
    });
  }

  handleWishlistClick() 
  {

  }
  
  handleReviewClick() 
  {
    if(this.User.getIsLoggedIn())
    {

      this.review.title = this.game.title;
      this.Review.addReview(this.review.title, this.reviewTextInput).subscribe((data) => 
      {
        if(data.success) 
        {
          console.log("Your review has been added!"); //replace text box with alert displaying this message
        }
      }
    )}
    // If the user is not logged in route them to the login page
    else {
      this.router.navigate(['/login']); //after logging in, reroute to game info page
    }

  }

  ngOnInit(): void {
    this.displayGame();
    this.displayReviews();
  }
}
