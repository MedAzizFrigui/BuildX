package com.example.productservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.util.List;

@Document(value = "Product")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    private String id;
    private String name;
    private String brand;
    private String picture;
    private String description;
    private ProductType type;
    private BigDecimal price;
    private String authId;
    private List<Comment> commentList;

    public void addComment(Comment comment){
        this.commentList.add(comment);
    }

}
