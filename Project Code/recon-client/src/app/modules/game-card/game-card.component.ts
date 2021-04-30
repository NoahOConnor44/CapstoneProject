import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { GameModel } from "src/app/models/game-model";

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {

  @Input() public games: GameModel;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.games.link = "/game/load/" + this.games.title;
  }
}
