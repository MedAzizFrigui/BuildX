import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {OidcSecurityService} from "angular-auth-oidc-client";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";


@Injectable(
  {
    providedIn:"root"
  }
)
export class AuthGuard implements CanActivate{
  constructor(
    private oidcSecurityService: OidcSecurityService,
    private router : Router
  ) {
  }

  isLoggedIn:boolean=false;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.oidcSecurityService.isAuthenticated().subscribe(ok => this.isLoggedIn=ok);
    if(this.isLoggedIn){
      return true;
    }else{
      this.router.navigateByUrl("/");
      return false;
    }
  }


}
