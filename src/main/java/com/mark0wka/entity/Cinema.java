package com.mark0wka.entity;

import lombok.Data;

import javax.persistence.*;

@Data
public class Cinema {

    private int id;

    private String objTypeId = "Cinema";

    private String address;

    private int hallsList;

}
