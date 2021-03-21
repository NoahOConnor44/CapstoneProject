import { Component, OnInit } from '@angular/core';
import { GameService } from "src/app/services/game.service";
import { GameModel } from "src/app/models/game-model";
import { ActivatedRoute } from "@angular/router"
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  public games: GameModel[] = [];

  public game = [];

  // Create variables for using necessary imports
  constructor(
    private route: ActivatedRoute,     
    private router: Router,
    private Game: GameService, 
    ) {}

  // searchGame(event) {
  //   event.preventDefault();
  //   const target = event.target;
  //   const searchTerm = target.querySelector("#searchTerm").value;

  //   console.log(searchTerm);
  //   this.Game.search(searchTerm).subscribe((data) => {
  //     if(data.success) {
  //       alert("Found matching search games from database.");
  //       console.log(data.data);
        
  //       this.game = data.data;

  //       let searchResult = [];

  //       this.game.forEach((game) => {
  //           searchResult.push({
  //             title: game.title,
  //             description: game.description,
  //             genre: game.genre,
  //             coop: game.coop,
  //             consoleType: game.consoleType,
  //             negativeRating: game.negativeRating,
  //             positiveRating: game.positiveRating
  //           });
  //         });
  //         this.games = searchResult;
  //       } else {
  //         alert("Search term not matched in database.");
  //       }
  //     });
  // }

  async searchGame(event) {
    event.preventDefault();
    const target = event.target;
    const searchTerm = target.querySelector("#searchTerm").value;

    console.log(searchTerm);
    await this.Game.search(searchTerm).subscribe({
      next: data => {
          if(data.success) {
            alert("Found matching search games from database.");
            console.log(data.data);
            
            this.game = data.data;
    
            let searchResult = [];
    
            this.game.forEach((game) => {
                searchResult.push({
                  title: game.title,
                  description: game.description,
                  genre: game.genre,
                  coop: game.coop,
                  consoleType: game.consoleType,
                  negativeRating: game.negativeRating,
                  positiveRating: game.positiveRating
                });
              });
              this.games = searchResult;
            } else {
              alert("Search term not matched in database.");
            }
      }
    });
  }



  ngOnInit(): void {}

}




// const gamesToDisplay = this.route.snapshot.paramMap.get("searchTerm");
//     console.log(gamesToDisplay);
//     this.Game.search(gamesToDisplay).subscribe((response) => {
//       if(response.success) {
//         alert("Found matching search games from database.");
//         console.log(response.data);

//         this.game = response.data;

//         let searchItem = [];

//         this.game.forEach((game) => {
//             searchItem.push({
//               title: game.title,
//               description: game.description,
//               genre: game.genre,
//               coop: game.coop,
//               consoleType: game.consoleType,
//               negativeRating: game.negativeRating,
//               positiveRating: game.positiveRating
//             });
//           });
//           this.games = searchItem;
//         } else {
//           alert("Search term not matched in database.");
//         }
//       });