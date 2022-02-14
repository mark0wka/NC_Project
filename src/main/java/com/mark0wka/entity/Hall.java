package com.mark0wka.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
public class Hall {

    private int id;

    private String objTypeId = "Hall";

    private Set<Attribute> attributes = new HashSet<>();

}
