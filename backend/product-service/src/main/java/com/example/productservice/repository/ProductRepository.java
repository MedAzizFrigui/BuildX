package com.example.productservice.repository;

import com.example.productservice.model.Product;
import com.example.productservice.model.ProductType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends MongoRepository<Product,String> {

    Optional<List<Product>> findByType(ProductType type);

}
