package com.mark0wka.controllers;

import com.mark0wka.Request;
import com.mark0wka.entity.Attribute;
import com.mark0wka.entity.Cinema;
import com.mark0wka.entity.EntityObject;
import com.mark0wka.repository.AttributeRepository;
import com.mark0wka.repository.CinemaObjectRepository;
import com.mark0wka.service.CreateServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("")
public class CinemaController {

    @Autowired
    CinemaObjectRepository ObjRepository;

    @Autowired
    AttributeRepository AttrRepository;

    @GetMapping("/cinema")
    public List<EntityObject> getAllCinemas() {
        return ObjRepository.findAll();
    }

    @PostMapping("/cinema")
    public Cinema createCinema(@RequestBody Cinema cinema) {
        System.out.println(cinema);
        EntityObject obj = cinema.getEntity();
        System.out.println(obj);
        ObjRepository.save(cinema.getEntity());
        //AttributeRepository.save
        return cinema;
    }


    @PostMapping("/create-cinema")
    public EntityObject createCinema(@RequestBody Request request) {
        if (!new CreateServices().cinemaValidator(request.getName(), ObjRepository)){
            System.out.println("Already exists");
            return null;
        }
        EntityObject entityObject = new EntityObject(request.getObjTypeId(), request.getName());
        EntityObject flushedEntity = ObjRepository.save(entityObject);
        Set<Attribute> attributes = request.getAttrMap().keySet().stream()
                .map(key -> new Attribute(
                        flushedEntity.getObjectId(),
                        key,
                        request.getAttrMap().get(key)))
                .collect(Collectors.toSet());
        flushedEntity.setAttributes(attributes);
        ObjRepository.save(flushedEntity);
        return flushedEntity;
    }


    @PostMapping("/create-hall")
    public EntityObject createHall(@RequestBody Request request) {
        if (!new CreateServices().cinemaValidator(request.getName(), ObjRepository)){
            System.out.println("Already exists");
            return null;
        }
        EntityObject entityObject = new EntityObject(request.getObjTypeId(), request.getName());
        EntityObject flushedEntity = ObjRepository.save(entityObject);
        Set<Attribute> attributes = request.getAttrMap().keySet().stream()
                .map(key -> new Attribute(
                        flushedEntity.getObjectId(),
                        key,
                        request.getAttrMap().get(key)))
                .collect(Collectors.toSet());
        flushedEntity.setAttributes(attributes);
        ObjRepository.save(flushedEntity);
        return flushedEntity;
    }

}
