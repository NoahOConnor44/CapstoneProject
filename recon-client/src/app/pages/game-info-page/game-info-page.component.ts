import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import { Router } from "@angular/router";
import { GameService } from "src/app/services/game.service";
import { GameModel } from "src/app/models/game-model";


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
    recommendations: []
  }

  // Create variables for using necessary imports
  constructor(  
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private Game: GameService, 
  ) {}

  // Method used to display game info on game page
  displayGame() {
    //TO DO: How to retrieve game title 
    let gameTitle: String = "Subnautica";

    //send game title to angular game.service.ts for routing
    this.Game.getGame(gameTitle).subscribe((data) => {
      if (data.success) {
        console.log(data);
        this.game = data.game;

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
        this.game.recommendations = data.gameRecommendations;

      } else {
        alert(
          "The game details have not been successfully retrieved from the database."
        );
      }
    });
  }
     
  ngOnInit(): void {

    if (this.activatedRoute.snapshot.url.length > 1) {
      const gameToDisplay = this.activatedRoute.snapshot.paramMap.get("game");
    }
    this.displayGame();
  }

}
