package com.mark0wka.entity;

import lombok.Data;

@Data
public class Cinema {

    private int id;

    private String objTypeId = "Cinema";

    //private Set<Attribute> attributes = new HashSet<>();

    private String name;

    private String address;

    private EntityObject entity = new EntityObject("a", "a");

    public Cinema(String name, String address) {
        this.id = entity.getObjectId();
        this.name = name;
        this.address = address;
        entity.setName(name);
        entity.setObjectTypeId(objTypeId);
        //entity.addAttribute(new Attribute(id, "Address", address));
        //entity.addAttribute(new Attribute(id, "Name", name));
    }
}
