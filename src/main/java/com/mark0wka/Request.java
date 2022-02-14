package com.mark0wka;

import java.util.HashMap;
import java.util.Map;

public class Request {

    private String name;
    private String objTypeId;
    private Map<Integer, String> attrMap;

    public Request(String objTypeId,String name, Map<Integer, String> attrMap) {
        this.objTypeId = objTypeId;
        this.name = name;
        this.attrMap = new HashMap<>(attrMap);
    }

    public String getName() {
        return name;
    }

    public String getObjTypeId() {
        return objTypeId;
    }

    public Map<Integer, String> getAttrMap() {
        return attrMap;
    }

    @Override
    public String toString() {
        return "Request{" +
                "objTypeId='" + objTypeId + '\'' +
                ", attrMap=" + attrMap +
                '}';
    }
}
