package com.mark0wka.controllers;

import com.mark0wka.entity.Cinema;
import com.mark0wka.entity.CinemaObject;
import com.mark0wka.repository.AttributeRepository;
import com.mark0wka.repository.CinemaObjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("")
public class CinemaController {

    @Autowired
    CinemaObjectRepository ObjRepository;

    @Autowired
    AttributeRepository AttrRepository;

    @GetMapping("/cinema")
    public List<CinemaObject> getAllCinemas() {
        return ObjRepository.findAll();
    }

    @PostMapping("/cinema")
    public Cinema createCinema(@RequestBody Cinema cinema) {
        System.out.println(cinema);
        CinemaObject obj = cinema.getCinemaObject();
        System.out.println(obj);
        ObjRepository.save(cinema.getCinemaObject());
        //AttributeRepository.save
        return cinema;
    }

}
