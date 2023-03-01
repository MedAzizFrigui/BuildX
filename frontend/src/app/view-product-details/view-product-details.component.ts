import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product} from "../dto/Product";
import {BackendService} from "../backendService";
import {UserResponseDTO} from "../dto/UserResponseDTO";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-view-product-details',
  templateUrl: './view-product-details.component.html',
  styleUrls: ['./view-product-details.component.css']
})
export class ViewProductDetailsComponent implements OnInit{

  productId : string='';
  product!:Product;
  // @ts-ignore
  owner:UserResponseDTO;
  userId:string="";
  constructor(private activatedRoute : ActivatedRoute , private backendService:BackendService,private matSnackBar:MatSnackBar) {
    this.userId=this.backendService.getuserId();
    this.productId=this.activatedRoute.snapshot.params['productId'];
    this.backendService.getProductById(this.productId).subscribe(data => {
      this.product=data;
      this.backendService.getUserById(this.product.authId).subscribe( user => {
        this.owner=user;
      })
    })
  }
  ngOnInit(): void {

  }

  addToFavorite() {
   this.backendService.addToFavorite(this.product,this.userId).subscribe(data =>{
     this.matSnackBar.open("Product added successfully to Favorites ", "OK");
   });

  }
}
