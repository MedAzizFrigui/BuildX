package com.example.productservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(value = "builds")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Builds {
    @Id
    private String id;
    private String title;
    private String cpuId;
    private String motherboardId;
    private String caseId;
    private String storageId;
    private String videoCardId;
    private String memoryId;



}
