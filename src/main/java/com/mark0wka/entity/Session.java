package com.mark0wka.entity;

import lombok.Data;

@Data
public class Session {

    private Cinema cinema;

    private Hall hall;

    private Film film;

    private String time;
}
