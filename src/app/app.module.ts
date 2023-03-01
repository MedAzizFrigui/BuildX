import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {BuildComponent, DialogOverviewExampleDialog} from './build/build.component';
import { BrowseComponent } from './browse/browse.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {AuthModule, LogLevel} from "angular-auth-oidc-client";
import {MatCardModule} from "@angular/material/card";
import {FlexLayoutModule} from '@angular/flex-layout'
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SaveProductDetailsComponent } from './save-product-details/save-product-details.component';
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import { ViewProductDetailsComponent } from './view-product-details/view-product-details.component';
import {MatChipsModule} from "@angular/material/chips";
import { CommentComponent } from './comment/comment.component';
import {MatListModule} from "@angular/material/list";
import { ChooseAProductComponent } from './choose-a-product/choose-a-product.component';
import {MatDialogModule} from "@angular/material/dialog";
import { ProfileComponent } from './profile/profile.component';
import {MatTabsModule} from "@angular/material/tabs";
import { FavProductsComponent } from './fav-products/fav-products.component';
import { CompletedBuildsComponent } from './completed-builds/completed-builds.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BuildComponent,
    BrowseComponent,
    SaveProductDetailsComponent,
    ViewProductDetailsComponent,
    CommentComponent,
    ChooseAProductComponent,
    DialogOverviewExampleDialog,
    ProfileComponent,
    FavProductsComponent,
    CompletedBuildsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonToggleModule,
        MatTooltipModule,
        MatButtonModule,
        HttpClientModule,
        AuthModule.forRoot({
            config: {
                authority: 'http://localhost:8762/realms/BuildX',
                redirectUrl: 'http://localhost:4200',
                postLogoutRedirectUri: 'http://localhost:4200',
                clientId: 'buildx-front-app',
                scope: 'openid profile email offline_access ',
                responseType: 'code',
                silentRenew: true,
                useRefreshToken: true,
                logLevel: LogLevel.Debug,
            },
        }),
        MatCardModule,
        FlexLayoutModule,
        MatTableModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatChipsModule,
        MatListModule,
        MatDialogModule,
        MatTabsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
