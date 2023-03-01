package com.example.productservice.controller;

import com.example.productservice.dto.CommentDTO;
import com.example.productservice.dto.ProductRequest;
import com.example.productservice.dto.ProductResponse;
import com.example.productservice.model.Comment;
import com.example.productservice.model.Product;
import com.example.productservice.model.ProductType;
import com.example.productservice.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void addProduct(@RequestBody ProductRequest productRequest){
        productService.addProduct(productRequest);
    }

    @GetMapping("/id/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Product getProductById(@PathVariable String id ){
        return productService.getProductById(id);
    }

    @GetMapping("/producttype/{productType}")
    @ResponseStatus(HttpStatus.OK)
    public List<ProductResponse> getProductsByType(@PathVariable ProductType productType){
        return productService.getProductsByType(productType);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteProductById(@PathVariable String id){
        productService.deleteProductById(id);
    }

    @GetMapping("/{id}/comment")
    @ResponseStatus(HttpStatus.OK)
    public List<CommentDTO> getAllComments(@PathVariable String id){
        return this.productService.getAllComments(id);
    }

    @PostMapping("/{id}/comment")
    @ResponseStatus(HttpStatus.CREATED)
    public void addComment(@RequestBody CommentDTO comment , @PathVariable String id){
        this.productService.addComment(id,comment);
    }


}
