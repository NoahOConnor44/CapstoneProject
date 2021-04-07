import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/auth.guard.service';
import { GameInfoPageComponent } from "./pages/game-info-page/game-info-page.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { LoginPageComponent} from "./pages/login-page/login-page.component";
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { SearchPageComponent } from "./pages/search-page/search-page.component";
import { UserPageComponent } from './pages/user-page/user-page.component';

const routes: Routes = [
  { path: 'game/load/:game', component: GameInfoPageComponent },
  { path: '', component: HomePageComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'game/search', component: SearchPageComponent},
  { path: 'user/view', component: UserPageComponent, canActivate: [AuthGuard]},
  { path: 'register', component: RegisterPageComponent},
  { path: 'logout', component: LoginPageComponent}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
