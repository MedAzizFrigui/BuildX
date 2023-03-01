import {AfterViewInit, Component, Inject} from '@angular/core';
import {ProductResponseDTO} from "../dto/ProductResponseDTO";
import {BackendService} from "../backendService";
import {MatTableDataSource} from "@angular/material/table";
import {MatSelectChange} from "@angular/material/select";
import {Router} from "@angular/router";
import {ProductsToView} from "../dto/ProductsToView";
import {Builds} from "../dto/Builds";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {BuildsDTO} from "../dto/BuildsDTO";
import {Product} from "../dto/Product";


export interface BuildTitleIndex{
  title:string;
  index:number;
}


@Component({
  selector: 'app-completed-builds',
  templateUrl: './completed-builds.component.html',
  styleUrls: ['./completed-builds.component.css']
})



export class CompletedBuildsComponent {

  cpu!:ProductsToView;
  memory!:ProductsToView;
  motherboard!:ProductsToView;
  videoCard!:ProductsToView;
  storage!:ProductsToView;
  case!:ProductsToView;
  productsToViews:ProductsToView[]=[];
  totalPrice:number=0;
  title:string="";
  displayedColumns: string[] = ['component', 'picture', 'price'];
  dataSource:any;
  userId:string=""
  savedBuilds!:Array<Builds>;
  savedBuildsList:BuildTitleIndex[]=[];
  curIndex:number=0;
  product!:Product;
  clicked:boolean=false;
  selectedBuildIndex!: number;
  username:string=""
  constructor(private dialog : MatDialog,private backendService:BackendService, private router:Router) {
        this.userId=this.backendService.getuserId();
        this.backendService.getUserById(this.userId).subscribe(user => {
          this.savedBuilds=user.savedBuilds;
          this.username=user.fullName;
          let cnt=0;
          for(const build of this.savedBuilds){
            this.savedBuildsList.push({
              "title":build.title,
              "index":cnt
            });
            cnt=cnt+1;
          }
        })
        this.productsToViews=[
          {id:"",component:"CPU",name:"",picture:"",price:0},
          {id:"",component:"Memory",name:"",picture:"",price:0},
          {id:"",component:"Video Card",name:"",picture:"",price:0},
          {id:"",component:"Storage",name:"",picture:"",price:0},
          {id:"",component:"Motherboard",name:"",picture:"",price:0},
          {id:"",component:"Case",name:"",picture:"",price:0},
        ];
        this.dataSource=new MatTableDataSource(this.productsToViews);
  }

  update(){
      this.title=this.savedBuildsList[this.curIndex].title;
      this.backendService.getProductById(this.savedBuilds[this.curIndex].cpuId).subscribe(cpu => {
        this.productsToViews[0].id=cpu.id;
        this.productsToViews[0].name=cpu.name;
        this.productsToViews[0].picture=cpu.picture;
        this.totalPrice-=cpu.price;
        this.productsToViews[0].price=cpu.price;
        this.totalPrice+=this.productsToViews[0].price;
        this.backendService.getProductById(this.savedBuilds[this.curIndex].memoryId).subscribe(memory => {
          this.productsToViews[1].id=memory.id;
          this.productsToViews[1].name=memory.name;
          this.productsToViews[1].picture=memory.picture;
          this.totalPrice-=memory.price;
          this.productsToViews[1].price=memory.price;
          this.totalPrice+=this.productsToViews[1].price;
          this.backendService.getProductById(this.savedBuilds[this.curIndex].videoCardId).subscribe(videoCard => {
            this.productsToViews[2].id=videoCard.id;
            this.productsToViews[2].name=videoCard.name;
            this.productsToViews[2].picture=videoCard.picture;
            this.totalPrice-=videoCard.price;
            this.productsToViews[2].price=videoCard.price;
            this.totalPrice+=this.productsToViews[2].price;
            this.backendService.getProductById(this.savedBuilds[this.curIndex].storageId).subscribe(storage => {
              this.productsToViews[3].id=storage.id;
              this.productsToViews[3].name=storage.name;
              this.productsToViews[3].picture=storage.picture;
              this.totalPrice-=storage.price;
              this.productsToViews[3].price=storage.price;
              this.totalPrice+=this.productsToViews[3].price;
              this.backendService.getProductById(this.savedBuilds[this.curIndex].motherboardId).subscribe(motherboard => {
                this.productsToViews[4].id=motherboard.id;
                this.productsToViews[4].name=motherboard.name;
                this.productsToViews[4].picture=motherboard.picture;
                this.totalPrice-=motherboard.price;
                this.productsToViews[4].price=motherboard.price;
                this.totalPrice+=this.productsToViews[4].price;
                this.backendService.getProductById(this.savedBuilds[this.curIndex].caseId).subscribe(casee => {
                  this.productsToViews[5].id=casee.id;
                  this.productsToViews[5].name=casee.name;
                  this.productsToViews[5].picture=casee.picture;
                  this.totalPrice-=casee.price;
                  this.productsToViews[5].price=casee.price;
                  this.totalPrice+=this.productsToViews[5].price;
                  this.totalPrice=this.productsToViews[0].price+this.productsToViews[1].price+this.productsToViews[2].price+this.productsToViews[3].price+this.productsToViews[4].price+this.productsToViews[5].price;
                })
              })
            })
          })
        })
      })
  }

  setBuild(cur:number) {
    this.selectedBuildIndex=cur;
    this.curIndex=cur;
    this.clicked=true;
    this.update();
  }

  redirectFunction(id:string) {
    console.log(id);
    if(!id){
      return ;
    }else{
      this.router.navigateByUrl("/view-product-details/" + id);
    }
  }
}
