import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameInfoPageComponent } from './pages/game-info-page/game-info-page.component';
import { GameService } from './services/game.service';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { GameCardComponent } from './modules/game-card/game-card.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { ReviewsService } from './services/reviews.service';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { UserService } from './services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { LogoutPageComponent } from './pages/logout-page/logout-page.component';
import { AuthGuard } from 'src/auth.guard.service';

@NgModule({
  declarations: [
    AppComponent,
    GameInfoPageComponent,
    HomePageComponent,
    LoginPageComponent,
    SearchPageComponent,
    GameCardComponent,
    UserPageComponent,
    RegisterPageComponent,
    LogoutPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,  // Needed for login page
    ReactiveFormsModule // Needed for login page
  ],
  providers: [GameService, ReviewsService, UserService, CookieService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
