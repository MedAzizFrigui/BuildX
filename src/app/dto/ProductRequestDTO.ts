import {ProductType} from "./ProductType";

export interface ProductRequestDTO{
  name:string;
  brand:string;
  picture:string;
  description:string;
  productType:ProductType;
  price:bigint;
  authId:string;
}
