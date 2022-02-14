package com.mark0wka.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "object_attribute_list")
@Data
@NoArgsConstructor
public class Attribute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "attr_id")
    private int attrId;

    @Column(name = "object_id", nullable = false)
    private int objectId;

    @Column(name = "name", nullable = true)
    private String name;

    @Column(name = "value", nullable = false)
    private String value;

    public Attribute(int objectId, Integer attrId, String value) {
        this.objectId = objectId;
        this.attrId = attrId;
        this.value = value;
    }
}
