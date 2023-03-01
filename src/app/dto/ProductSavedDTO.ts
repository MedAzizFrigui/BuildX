import {ProductType} from "./ProductType";

export interface ProductSavedDTO{
  id:string;
  name:string;
  brand:string;
  picture:string;
  description:string;
  type:ProductType;
  price:bigint;
}
