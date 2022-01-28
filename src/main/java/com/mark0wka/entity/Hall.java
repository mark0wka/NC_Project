package com.mark0wka.entity;

import lombok.Data;

import javax.persistence.*;

@Data
public class Hall {

    private int id;

    private String objTypeId = "Hall";

    private int cinemaId;

    private int seatsCount;

    private int[][] seats;

}
