package com.mark0wka.entity;

import lombok.Data;

import javax.persistence.*;

@Data
public class Film {

    private int id;

    private String objTypeId = "Film";

    private String name;

    private String description;

    private String genre;

    private double rating;

    private String year;

    private int budget;
}
