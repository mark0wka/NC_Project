package com.mark0wka.repository;

import com.mark0wka.entity.EntityObject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CinemaObjectRepository extends JpaRepository<EntityObject, Integer> {
    List<EntityObject> findByName (String name);
    List<EntityObject> findAllByObjectTypeId(String object_type_id);
    EntityObject findEntityObjectByObjectId(int object_id);
    EntityObject findEntityObjectByName(String name);
}
