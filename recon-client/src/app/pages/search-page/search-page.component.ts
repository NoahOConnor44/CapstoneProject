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

  // Create variables for using necessary imports
  constructor(
    private route: ActivatedRoute,     
    private router: Router,
    private Game: GameService, 
    ) {}

  searchGame(event) {
    event.preventDefault();
    const target = event.target;
    const searchTerm = target.querySelector("#searchTerm").value;

    console.log(searchTerm);
    this.Game.search(searchTerm).subscribe((data) => {
      if(data.success) {
        console.log(data.game);
        
        this.games = data.game;

        } else {
          alert("Couldn't find matching game in the database. Try a new game!");
        }
      });
  }

  ngOnInit(): void {}

}