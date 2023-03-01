import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BuildComponent} from "./build/build.component";
import {BrowseComponent} from "./browse/browse.component";
import {AuthGuard} from "./AuthGuard";
import {SaveProductDetailsComponent} from "./save-product-details/save-product-details.component";
import {ViewProductDetailsComponent} from "./view-product-details/view-product-details.component";
import {ChooseAProductComponent} from "./choose-a-product/choose-a-product.component";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  {path : "build", component:BuildComponent,canActivate:[AuthGuard]},
  {path : "browse", component:BrowseComponent,canActivate:[AuthGuard]},
  {path : "addProduct", component:SaveProductDetailsComponent,canActivate:[AuthGuard]},
  {path :"view-product-details/:productId" , component:ViewProductDetailsComponent,canActivate:[AuthGuard]},
  {path : "build/choose-a-product/:productType" , component:ChooseAProductComponent,canActivate:[AuthGuard]},
  {path :"profile" , component:ProfileComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
