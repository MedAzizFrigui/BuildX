import {AfterViewInit, Component} from '@angular/core';
import {ProductResponseDTO} from "../dto/ProductResponseDTO";
import {BackendService} from "../backendService";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../dto/Product";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-choose-a-product',
  templateUrl: './choose-a-product.component.html',
  styleUrls: ['./choose-a-product.component.css']
})
export class ChooseAProductComponent implements AfterViewInit{

  productResponse:ProductResponseDTO[]=[];
  displayedColumns: string[] = ['picture', 'name', 'brand', 'price', 'description','action'];
  dataSource:any;
  productType!:string;
  type:string="";
  productCount:number=0;
  product!:Product;
  constructor(private backendService:BackendService , private router:Router, private activateRoute : ActivatedRoute,
               private matSnackBar: MatSnackBar) {
    this.productType=this.activateRoute.snapshot.params['productType'];
    this.setType();
    this.backendService.getAllProducts(this.productType).subscribe((data) => {
      this.productResponse=data;

      this.dataSource=new MatTableDataSource(this.productResponse);

      this.productCount=this.productResponse.length;

    });
  }

  setType():void{
    if (this.productType === "MEMORY") {
      this.type = "Memory";
    } else if (this.productType === "CPU") {
      this.type= "CPU";
    }else if (this.productType === "STORAGE") {
      this.type= "Storage";
    }else if (this.productType === "MOTHERBOARD") {
      this.type= "Motherboard";
    }else if (this.productType === "CASE") {
      this.type= "Case";
    }else if (this.productType === "VIDEOCARD") {
      this.type= "Video Card";
    }
  }

  ngAfterViewInit(): void {
  }

  redirectFunction( id : string) {
    this.router.navigateByUrl("/view-product-details/" + id);
  }

  chooseProduct(id:string) {
    this.backendService.getProductById(id).subscribe(data => {
      this.product=data;
      if(this.productType==="MEMORY"){
        this.backendService.memory={
          'name':this.product.name,
          'picture':this.product.picture,
          'price':this.product.price,
          'id':this.product.id,
          'component':"Memory"
        }
      }else if(this.productType==="CPU"){
        this.backendService.cpu={
          'name':this.product.name,
          'picture':this.product.picture,
          'price':this.product.price,
          'id':this.product.id,
          'component':"Memory"
        }
      }else if(this.productType==="MOTHERBOARD"){
        this.backendService.motherboard={
          'name':this.product.name,
          'picture':this.product.picture,
          'price':this.product.price,
          'id':this.product.id,
          'component':"Memory"
        }
      }else if(this.productType==="STORAGE"){
        this.backendService.storage={
          'name':this.product.name,
          'picture':this.product.picture,
          'price':this.product.price,
          'id':this.product.id,
          'component':"Memory"
        }
      }else if(this.productType==="CASE"){
        this.backendService.case={
          'name':this.product.name,
          'picture':this.product.picture,
          'price':this.product.price,
          'id':this.product.id,
          'component':"Memory"
        }
      }else if(this.productType==="VIDEOCARD"){
        this.backendService.videoCard={
          'name':this.product.name,
          'picture':this.product.picture,
          'price':this.product.price,
          'id':this.product.id,
          'component':"Memory"
        }
      }
      this.matSnackBar.open("Component added successfully", "OK");
      this.router.navigateByUrl("build");
    })


  }

}
