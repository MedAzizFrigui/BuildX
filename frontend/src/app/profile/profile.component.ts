import { Component } from '@angular/core';
import {BackendService} from "../backendService";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  favParts:boolean=true;
  completedBuilds:boolean=false;
  username:string="";

  constructor(private backendservice:BackendService) {
    this.username=this.backendservice.getUserName();
  }

  activateBuilds() {
    this.favParts=false;
    this.completedBuilds=true;
  }

  activateFav() {
    this.completedBuilds=false;
    this.favParts=true;
  }
}
