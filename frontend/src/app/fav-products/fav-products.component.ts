import {AfterViewInit, Component} from '@angular/core';
import {BackendService} from "../backendService";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {ProductSavedDTO} from "../dto/ProductSavedDTO";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-fav-products',
  templateUrl: './fav-products.component.html',
  styleUrls: ['./fav-products.component.css']
})
export class FavProductsComponent implements AfterViewInit{


  productSaved:ProductSavedDTO[]=[];
  displayedColumns: string[] = ['picture', 'name', 'brand', 'price', 'description','action'];
  dataSource:any;
  selectedType:string="ALL_PRODUCTS";
  productCount:number=0;
  userId:string="";
  enlarge: boolean=false;
  constructor(private backendService:BackendService , private router:Router, private matSnackBar:MatSnackBar) {
    this.updateProductsList();
  }

  ngAfterViewInit(): void {
  }

  redirectFunction( id : string) {

    this.router.navigateByUrl("/view-product-details/" + id);
  }



  updateProductsList(){
    this.userId=this.backendService.getuserId();
    this.backendService.getUserById(this.userId).subscribe(data => {
      this.productSaved=data.savedProducts;
      this.dataSource=new MatTableDataSource(this.productSaved);
    })
  }



  removeProduct(id:string) {
      this.backendService.removeProduct(this.userId,id).subscribe(data => {
        this.matSnackBar.open("Product Metadata Updated successfully", "OK");
        this.updateProductsList();
      });
  }
}
