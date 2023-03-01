import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BackendService} from "../backendService";
import {ProductRequestDTO} from "../dto/ProductRequestDTO";

@Component({
  selector: 'app-save-product-details',
  templateUrl: './save-product-details.component.html',
  styleUrls: ['./save-product-details.component.css']
})
export class SaveProductDetailsComponent {

  saveProductDetailsForm: FormGroup;
  name: FormControl = new FormControl('');
  brand: FormControl = new FormControl('');
  description: FormControl = new FormControl('');
  productType: FormControl = new FormControl('');
  price: FormControl = new FormControl('');
  selectedFile!: File;
  selectedFileName = '';
  fileSelected = false;
  thumbnailUrl!: string;
  authId!:string;
  constructor(private router: Router, private backendService: BackendService,
              private matSnackBar: MatSnackBar  ) {
    this.authId=this.backendService.getuserId();
    this.saveProductDetailsForm = new FormGroup({
      name: this.name,
      brand:this.brand,
      description: this.description,
      productType: this.productType,
      price:this.price
    })
  }

  onFileSelected(event: Event) {
    // @ts-ignore
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile.name;
    this.fileSelected = true;
  }

  // onUpload() {
  //   this.videoService.uploadThumbnail(this.selectedFile, this.videoId)
  //     .subscribe(() => {
  //       // show an upload success notification.
  //       this.matSnackBar.open("Thumbnail Upload Successful", "OK");
  //     })
  // }

  saveProduct() {
    const productRequest:ProductRequestDTO={
      "name": this.saveProductDetailsForm.get('name')?.value,
      "brand": this.saveProductDetailsForm.get('brand')?.value,
      "description": this.saveProductDetailsForm.get('description')?.value,
      "productType": this.saveProductDetailsForm.get('productType')?.value,
      "price":this.saveProductDetailsForm.get('price')?.value,
      "picture":this.selectedFileName,
      "authId":this.authId
    }

    this.backendService.saveProduct(productRequest).subscribe(data => {
      this.matSnackBar.open("Product Metadata Updated successfully", "OK");
      this.router.navigateByUrl("/browse");
    })
  }
}
