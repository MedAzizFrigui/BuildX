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


@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.css']
})
export class BuildComponent implements AfterViewInit{

  cpu!:ProductsToView;
  memory!:ProductsToView;
  motherboard!:ProductsToView;
  videoCard!:ProductsToView;
  storage!:ProductsToView;
  case!:ProductsToView;
  productsToViews:ProductsToView[]=[];
  totalPrice:number=0;
  title:string="";
  displayedColumns: string[] = ['component', 'picture', 'price','remove'];
  dataSource:any;
  userId:string="";
  constructor(private dialog : MatDialog,private backendService:BackendService, private router:Router) {
    this.productsToViews=[
      {id:"",component:"CPU",name:"",picture:"",price:0},
      {id:"",component:"Memory",name:"",picture:"",price:0},
      {id:"",component:"Video Card",name:"",picture:"",price:0},
      {id:"",component:"Storage",name:"",picture:"",price:0},
      {id:"",component:"Motherboard",name:"",picture:"",price:0},
      {id:"",component:"Case",name:"",picture:"",price:0},
    ];
    this.userId=this.backendService.getuserId();
    this.dataSource=new MatTableDataSource(this.productsToViews);
  }

  ngAfterViewInit(): void {
    this.update();
  }

  update(){
    if(this.backendService.cpu){
      this.productsToViews[0].id=this.backendService.cpu.id;
      this.productsToViews[0].name=this.backendService.cpu.name;
      this.productsToViews[0].picture=this.backendService.cpu.picture;
      this.totalPrice-=this.productsToViews[0].price;
      this.productsToViews[0].price=this.backendService.cpu.price;
      this.totalPrice+=this.productsToViews[0].price;
    }
    if(this.backendService.memory){
      this.productsToViews[1].id=this.backendService.memory.id;
      this.productsToViews[1].name=this.backendService.memory.name;
      this.productsToViews[1].picture=this.backendService.memory.picture;
      this.totalPrice-=this.productsToViews[1].price;
      this.productsToViews[1].price=this.backendService.memory.price;
      this.totalPrice+=this.productsToViews[1].price;
    }
    if(this.backendService.videoCard){
      this.productsToViews[2].id=this.backendService.videoCard.id;
      this.productsToViews[2].name=this.backendService.videoCard.name;
      this.productsToViews[2].picture=this.backendService.videoCard.picture;
      this.totalPrice-=this.productsToViews[2].price;
      this.productsToViews[2].price=this.backendService.videoCard.price;
      this.totalPrice+=this.productsToViews[2].price;
    }
    if(this.backendService.storage){
      this.productsToViews[3].id=this.backendService.storage.id;
      this.productsToViews[3].name=this.backendService.storage.name;
      this.productsToViews[3].picture=this.backendService.storage.picture;
      this.totalPrice-=this.productsToViews[3].price;
      this.productsToViews[3].price=this.backendService.storage.price;
      this.totalPrice+=this.productsToViews[3].price;
    }
    if(this.backendService.motherboard){
      this.productsToViews[4].id=this.backendService.motherboard.id;
      this.productsToViews[4].name=this.backendService.motherboard.name;
      this.productsToViews[4].picture=this.backendService.motherboard.picture;
      this.totalPrice-=this.productsToViews[4].price;
      this.productsToViews[4].price=this.backendService.motherboard.price;
      this.totalPrice+=this.productsToViews[4].price;
    }
    if(this.backendService.case){
      this.productsToViews[5].id=this.backendService.case.id;
      this.productsToViews[5].name=this.backendService.case.name;
      this.productsToViews[5].picture=this.backendService.case.picture;
      this.totalPrice-=this.productsToViews[5].price;
      this.productsToViews[5].price=this.backendService.case.price;
      this.totalPrice+=this.productsToViews[5].price;
    }

    this.dataSource=new MatTableDataSource(this.productsToViews);

  }

  chooseProduct(component:string) {
      if(component==="CPU"){
        this.router.navigateByUrl("build/choose-a-product/CPU");
      }else if (component==="Memory") {
        this.router.navigateByUrl("build/choose-a-product/MEMORY");
      }else if (component==="Video Card") {
        this.router.navigateByUrl("build/choose-a-product/VIDEOCARD");
      }else if (component==="Case") {
        this.router.navigateByUrl("build/choose-a-product/CASE");
      }else if (component==="Motherboard") {
        this.router.navigateByUrl("build/choose-a-product/MOTHERBOARD");
      }else if (component==="Storage") {
        this.router.navigateByUrl("build/choose-a-product/STORAGE");
      }
  }

  RemoveComponent(component:string) {
    if(component==="CPU"){
      this.backendService.cpu.id="";
      this.backendService.cpu.name="";
      this.backendService.cpu.picture="";
      this.backendService.cpu.price=0;
    }else if (component==="Memory") {
      this.backendService.memory.id="";
      this.backendService.memory.name="";
      this.backendService.memory.picture="";
      this.backendService.memory.price=0;
    }else if (component==="Video Card") {
      this.backendService.videoCard.id="";
      this.backendService.videoCard.name="";
      this.backendService.videoCard.picture="";
      this.backendService.videoCard.price=0;
    }else if (component==="Case") {
      this.backendService.case.id="";
      this.backendService.case.name="";
      this.backendService.case.picture="";
      this.backendService.case.price=0;
    }else if (component==="Motherboard") {
      this.backendService.motherboard.id="";
      this.backendService.motherboard.name="";
      this.backendService.motherboard.picture="";
      this.backendService.motherboard.price=0;
    }else if (component==="Storage") {
      this.backendService.storage.id="";
      this.backendService.storage.name="";
      this.backendService.storage.picture="";
      this.backendService.storage.price=0;
    }
    this.update()
  }

  redirectFunction(id:string) {
    console.log(id);
    if(!id){
      return ;
    }else{
      this.router.navigateByUrl("/view-product-details/" + id);
    }
  }

  saveBuild() {
    let pc:BuildsDTO={
      "title":this.title,
      "cpuId":this.productsToViews[0].id,
      "memoryId":this.productsToViews[1].id,
      "videoCardId":this.productsToViews[2].id,
      "storageId":this.productsToViews[3].id,
      "motherboardId":this.productsToViews[4].id,
      "caseId":this.productsToViews[5].id
    };
    this.backendService.registerBuild(pc).subscribe(id =>{
      console.log(id);
      let builtPc:Builds={
        "title":this.title,
        "cpuId":this.productsToViews[0].id,
        "memoryId": this.productsToViews[1].id,
        "videoCardId": this.productsToViews[2].id,
        "storageId": this.productsToViews[3].id,
        "motherboardId": this.productsToViews[4].id,
        "caseId": this.productsToViews[5].id,
        "id":id
      }
      this.backendService.addBuild(this.userId,builtPc).subscribe(data => {
        console.log("build added to user successfully");
        this.RemoveComponent("CPU");
        this.RemoveComponent("Memory");
        this.RemoveComponent("Video Card");
        this.RemoveComponent("Case");
        this.RemoveComponent("Storage");
        this.RemoveComponent("Motherboard");

      });
    });

  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {title: this.title},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.title = result;
      if(this.title){
        this.saveBuild();
      }
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data:{title:string},
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
