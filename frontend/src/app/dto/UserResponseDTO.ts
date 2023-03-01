import {ProductSavedDTO} from "./ProductSavedDTO";
import {Builds} from "./Builds";

export interface UserResponseDTO{
  firstName:string;
  lastName:string;
  fullName:string;
  emailAddress:string;
  savedProducts:Array<ProductSavedDTO>;
  savedBuilds:Array<Builds>;
}
