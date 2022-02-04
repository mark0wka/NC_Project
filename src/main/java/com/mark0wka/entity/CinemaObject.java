package com.mark0wka.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

import static javax.persistence.CascadeType.ALL;

@Entity
@Table(name = "object_list")
@Data
public class CinemaObject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "object_id")
    private int objectId;

    @Column(name = "object_type_id", nullable = false)
    private String objectTypeId;

    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(cascade = ALL)
    private Set<Attribute> attributes = new HashSet<>();

    public void addAttribute(Attribute attribute) {
        attributes.add(attribute);
    }
}
