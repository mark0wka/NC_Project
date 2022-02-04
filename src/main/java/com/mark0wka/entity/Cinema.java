package com.mark0wka.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
public class Cinema {

    private int id;

    private String objTypeId = "Cinema";

    //private Set<Attribute> attributes = new HashSet<>();

    private String name;

    private String address;

    private CinemaObject cinemaObject = new CinemaObject();

    public Cinema(String name, String address) {
        this.id = cinemaObject.getObjectId();
        this.name = name;
        this.address = address;
        cinemaObject.setName(name);
        cinemaObject.setObjectTypeId(objTypeId);
        cinemaObject.addAttribute(new Attribute(id, "Address", address));
    }
}
