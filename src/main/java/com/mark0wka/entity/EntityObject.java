package com.mark0wka.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

import static javax.persistence.CascadeType.ALL;

@javax.persistence.Entity
@Table(name = "object_list")
@Data
@NoArgsConstructor
public class EntityObject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "object_id")
    private int objectId;

    @Column(name = "object_type_id", nullable = false)
    private String objectTypeId;

    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(cascade = ALL, mappedBy = "objectId")
    private Set<Attribute> attributes = new HashSet<>();

    public void addAttribute(Attribute attribute) {
        attributes.add(attribute);
    }


    public EntityObject(String objectTypeId, String name) {
        this.objectTypeId = objectTypeId;
        this.name = name;
    }
}
