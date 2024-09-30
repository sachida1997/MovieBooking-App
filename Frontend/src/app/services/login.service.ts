import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();
  
  constructor(private http: HttpClient) { }

  // current user which is logged in
  public getCurrentUser(){
    return this.http.get('http://localhost:8084/auth/v1.0/current-user');
  }

  //generate token
  public generateToken(loginData:any){
    return this.http.post('http://localhost:8084/auth/v1.0/login',loginData);
  }

  //login user: set token in local storage
  public loginUser(jwtToken: any){
    localStorage.setItem("jwtToken",jwtToken);
    return true;
  }

  //isLogin : user is logged in or not
  public isLoggedIn(){
    let tokenStr = localStorage.getItem('jwtToken');
    if(tokenStr==undefined || tokenStr == '' || tokenStr==null){
      return false;
    } else{
      return true;
    }
  }

  //logout : remove token from local storage
  public logout(){
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    return true;
  }

  // getToken
  public getToken(){
    return localStorage.getItem('jwtToken');
  }

  //set userDetail
  public setUser(user:any){
    localStorage.setItem("user",JSON.stringify(user));
  }

  //getUser
  public getUser(){
    let userStr = localStorage.getItem("user");
    if(userStr!=null){
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  // get User Role
  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}
