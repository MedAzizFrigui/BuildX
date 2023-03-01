package com.example.productservice.controller;

import com.example.productservice.dto.ProductSaved;
import com.example.productservice.dto.UserRequest;
import com.example.productservice.dto.UserResponse;
import com.example.productservice.model.Builds;
import com.example.productservice.model.Product;
import com.example.productservice.model.User;
import com.example.productservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void registerUser(@RequestBody UserRequest userRequest){
        this.userService.registerUser(userRequest);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UserResponse getUserById(@PathVariable String id){
        return this.userService.getUserById(id);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void addProduct(@PathVariable String id, @RequestBody Product product){
          this.userService.addProduct(id,product);
    }

    @PutMapping("/{id}/{productId}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void removeProduct(@PathVariable String id, @PathVariable String productId){
        this.userService.removeProduct(id,productId);
    }


    @PostMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public void addBuild(@RequestBody Builds builds, @PathVariable String id){
        this.userService.addBuild(id,builds);
    }

}
