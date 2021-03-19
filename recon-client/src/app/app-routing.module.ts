import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameInfoPageComponent } from "./pages/game-info-page/game-info-page.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { LoginPageComponent} from "./pages/login-page/login-page.component";
import { SearchPageComponent } from "./pages/search-page/search-page.component";

const routes: Routes = [
  { path: 'game/load', component: GameInfoPageComponent },
  { path: '', component: HomePageComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'search', component: SearchPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
