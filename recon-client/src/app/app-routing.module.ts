import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameInfoPageComponent } from "./pages/game-info-page/game-info-page.component";

const routes: Routes = [
  { path: 'loadGame', component: GameInfoPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
