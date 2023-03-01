import {ProductType} from "./ProductType";
import {Comment} from "./Comment"

export interface Product{
  id:string;
  name:string;
  brand:string;
  picture:string;
  description:string;
  type:ProductType;
  price:number;
  authId:string;
  commentList:Array<Comment>
}
