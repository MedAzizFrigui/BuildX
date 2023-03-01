package com.example.productservice.dto;

import com.example.productservice.model.Builds;
import com.example.productservice.model.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {

    private String firstName;
    private String lastName;
    private String fullName;
    private String emailAddress;
    private List<Product> savedProducts;
    private List<Builds> savedBuilds;
}