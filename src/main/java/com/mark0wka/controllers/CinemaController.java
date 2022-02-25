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

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("")
public class CinemaController {

    @Autowired
    CinemaObjectRepository ObjRepository;

    @Autowired
    AttributeRepository AttrRepository;

    @GetMapping("/cinema/all")
    public List<EntityObject> getAllCinemas() {
        return ObjRepository.findAllByObjectTypeId("Cinema");
    }

    @GetMapping("/films/all")
    public List<EntityObject> getAllFilms() {
        return ObjRepository.findAllByObjectTypeId("Film");
    }

    @GetMapping("/halls/all")
    public List<EntityObject> getAllHalls() {
        return ObjRepository.findAllByObjectTypeId("Hall");
    }

    @GetMapping("/seats/all")
    public List<EntityObject> getAllSeats() {
        return ObjRepository.findAllByObjectTypeId("Seat");
    }

    @PostMapping("/create/cinema")
    public EntityObject createCinema(@RequestBody Request request) {
        if (!new CreateServices().cinemaValidator(request.getName(), ObjRepository)){
            System.out.println("Already exists");
            return null;
        }
        return saveData(request);
    }
    
    @PostMapping("/create/film")
    public EntityObject createFilm(@RequestBody Request request) {
        return saveData(request);
    }

    @PostMapping("/create/hall")
    public EntityObject createHall(@RequestBody Request request) {
        EntityObject entityObject = saveData(request);
        Map<Integer, String> attributes = new HashMap<>();
        int cols = Integer.parseInt(request.getAttrMap().get(3));
        int rows = Integer.parseInt(request.getAttrMap().get(4));
        for(int i = 1; i <= cols; i++) {
            for(int j = 1; j <= rows; j++) {
                attributes.put(5, cols * (j - 1) + i + "");
                attributes.put(6, entityObject.getObjectId() + "");
                attributes.put(7, "false");
                saveData(new Request("Seat", i + "-" + j, attributes));
            }
        }
        return entityObject;
    }

    public EntityObject saveData(Request request) {
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
