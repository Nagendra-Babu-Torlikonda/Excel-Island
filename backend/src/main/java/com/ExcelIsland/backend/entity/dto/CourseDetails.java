package com.ExcelIsland.backend.entity.dto;

import com.ExcelIsland.backend.config.ObjectIdDeserializer;
import com.ExcelIsland.backend.config.ObjectIdSerializer;
import com.ExcelIsland.backend.entity.Course;
import com.ExcelIsland.backend.entity.Review;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.*;
import org.bson.types.ObjectId;

import java.util.List;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CourseDetails {

    @JsonSerialize(using = ObjectIdSerializer.class)
    @JsonDeserialize(using = ObjectIdDeserializer.class)
    private ObjectId courseId;

    private String title;
    private String demoVideo;
    private String mode;
    private String location;
    private String duration;
    private List<String> contents;
    private Long price;
    private List<Review> reviews;
    private String instructorName;
    private String instructorDesignation;
    private String instructorBio;
    private String instructor;
    private double rating;
}


