import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserResponseDTO} from "./dto/UserResponseDTO";
import {Observable} from "rxjs";
import {UserRequestDTO} from "./dto/UserRequestDTO";
import {ProductResponseDTO} from "./dto/ProductResponseDTO";
import {ProductRequestDTO} from "./dto/ProductRequestDTO";
import {Product} from "./dto/Product";
import {CommentDTO} from "./dto/CommentDTO";
import {ProductsToView} from "./dto/ProductsToView";
import {BuildsDTO} from "./dto/BuildsDTO";
import {Builds} from "./dto/Builds";

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  get motherboard(): ProductsToView {
    return this._motherboard;
  }

  set motherboard(value: ProductsToView) {
    this._motherboard = value;
  }


  private _cpu!:ProductsToView;
  private _memory!:ProductsToView;
  private _videoCard!:ProductsToView;
  private _storage!:ProductsToView;
  private _case!:ProductsToView;
  private _motherboard!:ProductsToView;

  userId:string="";
  name:string="";




  constructor(private httpClient: HttpClient) {
  }



  get case(): ProductsToView {
    return this._case;
  }

  set case(value: ProductsToView) {
    this._case = value;
  }
  get videoCard(): ProductsToView {
    return this._videoCard;
  }

  set videoCard(value: ProductsToView) {
    this._videoCard = value;
  }
  get storage(): ProductsToView {
    return this._storage;
  }

  set storage(value: ProductsToView) {
    this._storage = value;
  }
  get memory(): ProductsToView {
    return this._memory;
  }

  set memory(value: ProductsToView) {
    this._memory = value;
  }
  get cpu(): ProductsToView {
    return this._cpu;
  }

  set cpu(value: ProductsToView) {
    this._cpu = value;
  }

  setUserId(id:string){
    this.userId=id;
  }

  getuserId(){
    return this.userId;
  }
  setUserName(name:string){
    this.name=name;
  }
  getUserName(){
    return this.name;
  }

  getUserById(id:string):Observable<UserResponseDTO>{
    return this.httpClient.get<UserResponseDTO>("http://localhost:8080/api/user/"+id);
  }


  registerUser(user: UserRequestDTO) {
    return this.httpClient.post("http://localhost:8080/api/user",user);
  }

  getAllProducts(type:string):Observable<Array<ProductResponseDTO>>{
    return this.httpClient.get<Array<ProductResponseDTO>>("http://localhost:8080/api/product/producttype/"+type)
  }

  deleteProductById(id: string) {
    return this.httpClient.delete("http://localhost:8080/api/product/"+id)
  }

  saveProduct(productRequest: ProductRequestDTO) {
    return this.httpClient.post("http://localhost:8080/api/product",productRequest);
  }

  getProductById(productId: string):Observable<Product> {
    console.log(productId);
    return this.httpClient.get<Product>("http://localhost:8080/api/product/id/"+productId)
  }

  getAllComments(productId: string):Observable<Array<CommentDTO>> {
    return this.httpClient.get<Array<CommentDTO>>("http://localhost:8080/api/product/"+productId+"/comment");
  }

  postComment(commentDto: CommentDTO, productId: string):Observable<any> {
   return this.httpClient.post<any>("http://localhost:8080/api/product/"+productId+"/comment",commentDto);
  }

  registerBuild(pc: BuildsDTO):Observable<string> {
    return this.httpClient.post("http://localhost:8080/api/builds",pc,{responseType: 'text'});
  }

  addBuild(userId: string, builtPc: Builds):Observable<any> {
    return this.httpClient.post<any>("http://localhost:8080/api/user/"+userId,builtPc);
  }

  removeProduct(userId: string, id: string):Observable<any> {
    return this.httpClient.put<any>("http://localhost:8080/api/user/"+userId+"/"+id,"");
  }

  addToFavorite(product: Product, userId: string):Observable<any>{
    return this.httpClient.put<any>("http://localhost:8080/api/user/"+userId,product);
  }
}
