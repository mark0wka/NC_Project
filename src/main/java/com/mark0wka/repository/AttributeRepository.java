package com.mark0wka.repository;

import com.mark0wka.entity.Attribute;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttributeRepository extends JpaRepository<Attribute, Integer> {
    Attribute findAttributeByObjectIdAndAttrId(int object_id, int attr_id);
    List<Attribute> findByAttrIdAndValue(int attr_id, String value);
}
