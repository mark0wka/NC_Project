package com.mark0wka.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
public class Film {

    private int id;

    private String objTypeId = "Film";

    private Set<Attribute> attributes = new HashSet<>();
}
