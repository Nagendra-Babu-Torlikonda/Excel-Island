package com.ExcelIsland.backend.entity.dto;

import com.ExcelIsland.backend.config.ObjectIdDeserializer;
import com.ExcelIsland.backend.config.ObjectIdSerializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.*;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InstructorDetails {

    @JsonSerialize(using = ObjectIdSerializer.class)
    @JsonDeserialize(using = ObjectIdDeserializer.class)
    private ObjectId id;
    private String username;
    private String designation;
    private String bio;
    private String profilePic;
    private List<InstructorReviewDTO> reviews = new ArrayList<>();
    private List<InstructorCourseView> courses = new ArrayList<>();
    private Map<String, String> contacts;
}

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
class InstructorCourseView{
    @JsonSerialize(using = ObjectIdSerializer.class)
    @JsonDeserialize(using = ObjectIdDeserializer.class)
    private ObjectId courseId;
    private String title;
}
