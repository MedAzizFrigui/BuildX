package com.example.productservice.service;

import com.example.productservice.dto.ProductSaved;
import com.example.productservice.dto.UserRequest;
import com.example.productservice.dto.UserResponse;
import com.example.productservice.model.Builds;
import com.example.productservice.model.Product;
import com.example.productservice.model.User;
import com.example.productservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Iterator;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;

    public void registerUser(UserRequest userRequest){
        User user=User.builder()
                .id(userRequest.getId())
                .firstName(userRequest.getFirstName())
                .lastName(userRequest.getLastName())
                .fullName(userRequest.getFullName())
                .emailAddress(userRequest.getEmailAddress())
                .build();
        user.setSavedProducts(Collections.emptyList());
        user.setSavedBuilds(Collections.emptyList());

        this.userRepository.save(user);

        log.info("User save successfully with the id {}",user.getId());
    }

    public UserResponse getUserById(String id) {


        User user;

        user=this.userRepository.findById(id).orElseThrow(()->
                new IllegalArgumentException("User with the given id does not exist"));

        log.info("user is found");

        return UserResponse.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .fullName(user.getFullName())
                .emailAddress(user.getEmailAddress())
                .savedProducts(user.getSavedProducts())
                .savedBuilds(user.getSavedBuilds())
                .build();

    }

    public void addProduct(String id, Product product) {
        User user=this.userRepository.findById(id).orElseThrow(()->
                new IllegalArgumentException("User with the given id does not exist"));

        List<Product> productSavedList=user.getSavedProducts();
        productSavedList.add(product);
        user.setSavedProducts(productSavedList);

        this.userRepository.save(user);
    }

    public void removeProduct(String id, String productId) {
        User user=this.userRepository.findById(id).orElseThrow(()->
                new IllegalArgumentException("User with the given id does not exist"));

        List<Product> productSavedList=user.getSavedProducts();
        Iterator<Product> iterator=productSavedList.iterator();
        while(iterator.hasNext()){
            Product product = iterator.next();
            if(product.getId().equals(productId)){
                iterator.remove();
                break;
            }
        }
        user.setSavedProducts(productSavedList);
        this.userRepository.save(user);
    }

    public void addBuild(String id,Builds builds) {
        User user;
        user=this.userRepository.findById(id).orElseThrow(()->
                new IllegalArgumentException("User with the given id does not exist"));

        user.addBuild(builds);
        log.info("build added successfully to user with the id {}",user.getId() );
        this.userRepository.save(user);
    }


}
