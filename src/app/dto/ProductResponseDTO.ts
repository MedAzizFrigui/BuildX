import {ProductType} from "./ProductType";

export interface ProductResponseDTO{
  id:string;
  name:string;
  brand:string;
  picture:string;
  description:string;
  type:ProductType;
  price:number;
  authId:string;
}
