package com.mark0wka.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "objectList")
@Data
public class CinemaObject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "object_type_id", nullable = false)
    private int objectTypeId;

    @Column(name = "name", nullable = false)
    private String name;
}
