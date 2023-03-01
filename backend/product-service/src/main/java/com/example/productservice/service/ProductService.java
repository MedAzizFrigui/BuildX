package com.example.productservice.service;

import com.example.productservice.dto.CommentDTO;
import com.example.productservice.dto.ProductRequest;
import com.example.productservice.dto.ProductResponse;
import com.example.productservice.model.Comment;
import com.example.productservice.model.Product;
import com.example.productservice.model.ProductType;
import com.example.productservice.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;

    public void addProduct(ProductRequest productRequest) {
        Product product=Product.builder()
                .name(productRequest.getName())
                .price(productRequest.getPrice())
                .authId(productRequest.getAuthId())
                .brand(productRequest.getBrand())
                .type(productRequest.getProductType())
                .description(productRequest.getDescription())
                .picture(productRequest.getPicture())
                .build();
        product.setCommentList(Collections.emptyList());

        log.info(productRequest.getPicture());

        productRepository.save(product);
        log.info("product with the id {} is saved ",product.getId());
    }

    public List<ProductResponse> getAllProducts() {
        List<Product>products=productRepository.findAll();
        return products.stream().map(this::mapToProductResponse).toList();
    }

    private ProductResponse mapToProductResponse(Product product){
        return ProductResponse.builder()
                .id(product.getId())
                .authId(product.getAuthId())
                .brand(product.getBrand())
                .description(product.getDescription())
                .name(product.getName())
                .picture(product.getPicture())
                .price(product.getPrice())
                .type(product.getType())
                .build();
    }

    public Product getProductById(String id) {
        return productRepository.findById(id).orElseThrow(()->
                new IllegalArgumentException("Product with the given id does not exist"));
    }

    public List<ProductResponse> getProductsByType(ProductType productType) {

        if(productType.equals(ProductType.ALL_PRODUCTS)){
            return getAllProducts();
        }

        Optional<List<Product>> optionalProducts=productRepository.findByType(productType);

        return optionalProducts.orElse(Collections.emptyList())
                .stream()
                .map(this::mapToProductResponse)
                .toList();
    }

    public void deleteProductById(String id) {

        log.info("product with the id {} is trying to get deleted",id);
        if(!  productRepository.existsById(id) ){
            throw new IllegalStateException("no such product id");
        }
        productRepository.deleteById(id);
        log.info("product with the id {} is deleted",id);
    }

    public List<CommentDTO> getAllComments(String id) {
        Product product=productRepository.findById(id).orElseThrow(()->
                new IllegalArgumentException("Product with the given id does not exist"));

        return product.getCommentList().stream().map(this::mapToCommentDTO).toList();
    }

    private CommentDTO mapToCommentDTO(Comment comment) {
        return CommentDTO.builder()
                .authId(comment.getAuthorID())
                .text(comment.getText())
                .name(comment.getName())
                .build();
    }

    public void addComment(String id,CommentDTO commentDTO) {
        Product product=productRepository.findById(id).orElseThrow(()->
                new IllegalArgumentException("Product with the given id does not exist"));
        Comment comment=Comment.builder()
                .authorID(commentDTO.getAuthId())
                .text(commentDTO.getText())
                .dislikeCount(0)
                .likeCount(0)
                .name(commentDTO.getName())
                .build();
        product.addComment(comment);
        productRepository.save(product);
        log.info("comment added to product with the id {}",id);
    }
}
