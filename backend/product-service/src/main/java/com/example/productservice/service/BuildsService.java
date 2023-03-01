package com.example.productservice.service;

import com.example.productservice.model.Builds;
import com.example.productservice.repository.BuildsRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class BuildsService {

    private final BuildsRepository buildsRepository;


    public String createBuild(Builds builds) {
        this.buildsRepository.save(builds);
        log.info("build with the id {} has been created",builds.getId());
        return builds.getId();
    }

    public Builds getBuildById(String id) {
        return this.buildsRepository.findById(id).orElseThrow(()->
                new IllegalArgumentException("Build with the given id does not exist"));
    }
}
