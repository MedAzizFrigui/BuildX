import {Component, OnInit} from '@angular/core';
import {OidcSecurityService} from "angular-auth-oidc-client";
import {UserRequestDTO} from "../dto/UserRequestDTO";
import {BackendService} from "../backendService";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  firstname:string="";
  isLoggedIn:boolean=false;
  userId:string="";
  lastname:string="";
  fullName:string="";
  email:string="";
  constructor(public oidcSecurityService: OidcSecurityService , private backendService:BackendService) {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated,userData, accessToken, idToken }) =>{
      if(isAuthenticated) {
        this.isLoggedIn=true;
        this.firstname=userData.given_name;
        this.lastname=userData.family_name;
        this.fullName=userData.name;
        this.email=userData.email;
        this.userId=userData.sub;
        this.backendService.setUserName(this.fullName);
        this.backendService.setUserId(this.userId);
      }
    });

    if(this.isLoggedIn){
      const user:UserRequestDTO={
        "id":this.userId,
        "firstName":this.firstname,
        "lastName":this.lastname,
        "fullName":this.fullName,
        "emailAddress":this.email
      }

      this.backendService.getUserById(user.id).subscribe((data) => {
        console.log("User found:", data);
      }, (error) => {
        console.error("Error:", error);
        this.backendService.registerUser(user).subscribe((data) => {
          console.log("User registered:", data);
        }, (error) => {
          console.error("Error:", error);
        });
      });

    }

    this.backendService.setUserId(this.userId);
  }


  ngOnInit() {

  }


  login(){
    this.oidcSecurityService.authorize();
  }

  logout(){
    this.oidcSecurityService.logoff().subscribe((result) => console.log(result));
  }



}
