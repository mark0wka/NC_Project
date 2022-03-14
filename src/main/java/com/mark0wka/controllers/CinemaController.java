package com.mark0wka.controllers;

import com.mark0wka.Request;
import com.mark0wka.entity.Attribute;
import com.mark0wka.entity.EntityObject;
import com.mark0wka.entity.ReservedSeatReq;
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
    CinemaObjectRepository objectRepository;

    @Autowired
    AttributeRepository attributeRepository;

    @GetMapping("/cinema/all")
    public List<EntityObject> getAllCinemas() {
        return objectRepository.findAllByObjectTypeId("Cinema");
    }

    @GetMapping("/films/all")
    public List<EntityObject> getAllFilms() {
        return objectRepository.findAllByObjectTypeId("Film");
    }

    @GetMapping("/halls/all")
    public List<EntityObject> getAllHalls() {
        return objectRepository.findAllByObjectTypeId("Hall");
    }

    @GetMapping("/seats/all")
    public List<EntityObject> getAllSeats() {
        return objectRepository.findAllByObjectTypeId("Seat");
    }

    @GetMapping("/sessions/all")
    public List<EntityObject> getAllSessions() {
        return objectRepository.findAllByObjectTypeId("Session");
    }

    @GetMapping("/halls/{cinemaName}")
    public Set<EntityObject> getHallsByCinemaName(@PathVariable String cinemaName) {
        Set<EntityObject> result = new HashSet<>();
        List<Attribute> id = attributeRepository.findByAttrIdAndValue(2, String.valueOf(objectRepository.findEntityObjectByName(cinemaName).getObjectId()));
        id.forEach(x -> result.add(objectRepository.findEntityObjectByObjectId(x.getObjectId())));
        return result;
    }

    @GetMapping("/sessions/{filmId}")
    public Set<EntityObject> getSessionsByFilmId(@PathVariable int filmId) {
        Set<EntityObject> result = new HashSet<>();
        List<Attribute> id = attributeRepository.findByAttrIdAndValue(8, String.valueOf(filmId));
        id.forEach(x -> result.add(objectRepository.findEntityObjectByObjectId(x.getObjectId())));
        return result;
    }

    @GetMapping("/seats/{sessionId}")
    public Set<EntityObject> getSeatsBySessionId(@PathVariable int sessionId) {
        Set<EntityObject> result = new HashSet<>();
        List<Attribute> id = attributeRepository.findByAttrIdAndValue(22, String.valueOf(sessionId));
        id.forEach(x -> result.add(objectRepository.findEntityObjectByObjectId(x.getObjectId())));
        return result;
    }

    @GetMapping("/hello")
    public String hello() {
        return "hello!";
    }


    @PostMapping("/create/cinema")
    public EntityObject createCinema(@RequestBody Request request) {
        if (!new CreateServices().cinemaValidator(request.getName(), objectRepository)){
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
        return saveData(request);
    }

    @PutMapping("/update/seat")
    public List<EntityObject> updateSeat(@RequestBody ReservedSeatReq request) {
        List<Integer> seatsId = request.getSeatsId();
        boolean isAnyConflict = seatsId.stream()
                .map(seat -> attributeRepository.findAttributeByObjectIdAndAttrId(seat, 23))
                .map(Attribute::getValue)
                .anyMatch("true"::equals);
        if (isAnyConflict) {
            //throw exceptiom
        }
        return seatsId.stream()
                .map(objectRepository::getById)
                .map(seat -> bookSeat(seat, request.getUser()))
                .collect(Collectors.toList());
    }

    private EntityObject bookSeat(final EntityObject seat, final int userId) {
        seat.setValue(23, "true");
        seat.setValue(24, String.valueOf(userId));
        return objectRepository.save(seat);
    }


    @PostMapping("/create/session")
    public EntityObject createSession(@RequestBody Request request) {
        EntityObject hall = objectRepository.findEntityObjectByObjectId(Integer.parseInt(request.getAttrMap().get(7)));
        EntityObject entityObject = saveData(request);
        int cols = Integer.parseInt(attributeRepository.findAttributeByObjectIdAndAttrId(hall.getObjectId(), 3).getValue());
        int rows = Integer.parseInt(attributeRepository.findAttributeByObjectIdAndAttrId(hall.getObjectId(), 4).getValue());
        Map<Integer, String> attributes = new HashMap<>();
        for(int i = 1; i <= cols; i++) {
            for(int j = 1; j <= rows; j++) {
                attributes.put(20, cols * (j - 1) + i + "");
                attributes.put(21, hall.getObjectId() + "");
                attributes.put(22, entityObject.getObjectId() + "");
                attributes.put(23, "false");
                saveData(new Request("Seat", i + "-" + j, attributes));
            }
        }
        return entityObject;
    }

    public EntityObject saveData(Request request) {
        EntityObject entityObject = new EntityObject(request.getObjTypeId(), request.getName());
        EntityObject flushedEntity = objectRepository.save(entityObject);
        Set<Attribute> attributes = request.getAttrMap().keySet().stream()
                .map(key -> new Attribute(
                        flushedEntity.getObjectId(),
                        key,
                        request.getAttrMap().get(key)))
                .collect(Collectors.toSet());
        flushedEntity.setAttributes(attributes);
        objectRepository.save(flushedEntity);
        return flushedEntity;
    }
}
