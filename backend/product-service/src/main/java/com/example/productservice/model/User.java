package com.example.productservice.model;

import com.example.productservice.dto.ProductSaved;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(value = "User")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String fullName;
    private String emailAddress;
    private List<Product> savedProducts;
    private List<Builds> savedBuilds;

    public void addBuild(Builds builds){
        this.savedBuilds.add(builds);
    }

}
