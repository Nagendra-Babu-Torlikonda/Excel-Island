package com.ExcelIsland.backend.entity;

import lombok.*;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class Instructor extends User{

    private String bio;
    private String designation;
    private Map<String, String> contacts;
    private List<ObjectId> courses = new ArrayList<>();
}
