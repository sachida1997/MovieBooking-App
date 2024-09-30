import { Component, ViewChild } from '@angular/core';
import { LoginService } from '../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginData = {
    username: '',
    password: '',
  }

  constructor(private login: LoginService, private router:Router) {}

  formSubmit() {
    // request the server to generate token
    this.login.generateToken(this.loginData).subscribe((data:any)=>{
      console.log(data);

      //login
      this.login.loginUser(data.jwtToken);
      this.login.getCurrentUser().subscribe((user:any)=>{
        this.login.setUser(user);
        console.log(user);

        //redirect
        if(this.login.getUserRole()=="ADMIN_USER"){
          this.router.navigate(['admin']);
          this.login.loginStatusSubject.next(true);
        } else if(this.login.getUserRole()=="NORMAL_USER"){
          this.router.navigate(['/user-dashboard']);
          this.login.loginStatusSubject.next(true);
        } else {
          this.login.logout();

        }
      })

    },(error)=>{
      console.log("Error");
      Swal.fire('Could not login', 'Invalid Credentials!!', 'error');
    })
  }
}
