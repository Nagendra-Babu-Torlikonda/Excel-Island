package com.ExcelIsland.backend.entity;

import com.ExcelIsland.backend.config.ObjectIdDeserializer;
import com.ExcelIsland.backend.config.ObjectIdSerializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true)
public class Student extends User {

    @JsonSerialize(contentUsing = ObjectIdSerializer.class)
    @JsonDeserialize(contentUsing = ObjectIdDeserializer.class)
    private List<ObjectId> enrolledCourses = new ArrayList<>();

    @JsonSerialize(contentUsing = ObjectIdSerializer.class)
    @JsonDeserialize(contentUsing = ObjectIdDeserializer.class)
    private List<ObjectId> completedCourses = new ArrayList<>();

    private List<String> certificates = new ArrayList<>();

    @JsonSerialize(contentUsing = ObjectIdSerializer.class)
    @JsonDeserialize(contentUsing = ObjectIdDeserializer.class)
    private List<ObjectId> cartCourses = new ArrayList<>();

}
