package com.example.productservice.dto;


import com.example.productservice.model.ProductType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductSaved {

    private String name;
    private String brand;
    private String picture;
    private String description;
    private ProductType type;
    private BigDecimal price;

}
