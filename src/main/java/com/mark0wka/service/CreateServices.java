package com.mark0wka.service;

import com.mark0wka.entity.EntityObject;
import com.mark0wka.repository.CinemaObjectRepository;
import org.apache.tomcat.jni.Time;
import org.springframework.beans.factory.annotation.Autowired;

public class CreateServices {

    public boolean cinemaValidator (String cinemaName, CinemaObjectRepository repository) {
        if (repository.findByName(cinemaName).isEmpty()) {
            return true;
        }
        return false;
    }
}
