package com.mark0wka.entity;

import com.mark0wka.repository.AttributeRepository;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Optional;
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

    public void setValue(final int attrId, final String value) {
        Optional<Attribute> any = this.getAttributes().stream()
                .filter(attr -> attr.getAttrId() == attrId)
                .findAny();
        if (any.isPresent()) {
            any.get().setValue(value);
            return;
        }
        Attribute attribute = new Attribute(this.getObjectId(), attrId, value);
        this.getAttributes().add(attribute);
    }
}
