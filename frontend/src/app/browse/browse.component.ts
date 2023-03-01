import {AfterViewInit, Component} from '@angular/core';
import {ProductResponseDTO} from "../dto/ProductResponseDTO";
import {BackendService} from "../backendService";
import {MatTableDataSource} from "@angular/material/table";
import {MatSelectChange} from "@angular/material/select";
import {Router} from "@angular/router";

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements AfterViewInit{

   productResponse:ProductResponseDTO[]=[];
   displayedColumns: string[] = ['picture', 'name', 'brand', 'price', 'description','action'];
   dataSource:any;
   selectedType:string="ALL_PRODUCTS";
   productCount:number=0;
   userId:string="";
  enlarge: boolean=false;
  constructor(private backendService:BackendService , private router:Router) {
      this.userId=this.backendService.getuserId();
      this.backendService.getAllProducts(this.selectedType).subscribe((data) => {
      this.productResponse=data;

      this.dataSource=new MatTableDataSource(this.productResponse);

      this.productCount=this.productResponse.length;

    });
  }

  ngAfterViewInit(): void {
  }

  redirectFunction( id : string) {

      this.router.navigateByUrl("/view-product-details/" + id);
  }


  onOptionSelected($event: MatSelectChange) {
    this.updateProductsList()
  }

  updateProductsList(){
    this.backendService.getAllProducts(this.selectedType).subscribe((data) => {
      this.productResponse=data;

      this.dataSource=new MatTableDataSource(this.productResponse);

      this.productCount=this.productResponse.length;

    });
  }

  deleteProductById(id:string) {
    console.log(id);
    this.backendService.deleteProductById(id).subscribe(
      (response) => {
        console.log("Product deleted successfully:", response);
        this.updateProductsList();
      },
      (error) => {
        console.error("Error deleting product:", error);
      }
    );

  }

  addProduct() {
    this.router.navigateByUrl("/addProduct")
  }
}
