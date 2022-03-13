package com.mark0wka.entity;

import lombok.Data;

import java.util.List;

@Data
public class ReservedSeatReq {
    private List<Integer> seatsId;
    private int user;

}
