package com.example.productservice.controller;


import com.example.productservice.model.Builds;
import com.example.productservice.service.BuildsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/builds")
public class BuildsController {

    private final BuildsService buildsService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    private String createBuild(@RequestBody Builds builds){
       return this.buildsService.createBuild(builds);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    private Builds getBuildById(@PathVariable String id){
        return this.buildsService.getBuildById(id);
    }


}
