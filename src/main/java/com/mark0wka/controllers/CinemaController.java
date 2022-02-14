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

    @PostMapping("/cinema")
    public Cinema createCinema(@RequestBody Cinema cinema) {
        System.out.println(cinema);
        EntityObject obj = cinema.getEntity();
        System.out.println(obj);
        ObjRepository.save(cinema.getEntity());
        //AttributeRepository.save
        return cinema;
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
    public Set<EntityObject> createHall(@RequestBody Request request) {
        EntityObject entityObject = saveData(request);
        Set<EntityObject> hallAndSeats = new HashSet<>();
        hallAndSeats.add(entityObject);
        for(int i = 0; i < Integer.parseInt(request.getAttrMap().get(3)) * Integer.parseInt(request.getAttrMap().get(4)); i++) {
            Map<Integer, String> attributes = new HashMap<>();
            attributes.put(5, i + 1 + "");
            attributes.put(6, entityObject.getObjectId() + "");
            attributes.put(7, "false");
            saveData(new Request("Seat", null, attributes));
        }
        return hallAndSeats;
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
