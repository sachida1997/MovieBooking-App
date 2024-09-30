import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { authInterceptorProviders } from './services/auth.interceptor';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { AddmovieComponent } from './admin/addmovie/addmovie.component';
import { UpdatemovieComponent } from './admin/updatemovie/updatemovie.component';
import { BookTicketsComponent } from './user/book-tickets/book-tickets.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    HomeComponent,
    DashboardComponent,
    UserDashboardComponent,
    AddmovieComponent,
    UpdatemovieComponent,
    BookTicketsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule, 
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatTableModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
