package com.example.productservice.repository;

import com.example.productservice.model.Builds;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BuildsRepository extends MongoRepository<Builds,String> {
}
