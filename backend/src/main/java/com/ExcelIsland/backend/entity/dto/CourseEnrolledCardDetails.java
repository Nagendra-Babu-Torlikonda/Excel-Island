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
import java.util.Map;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CourseEnrolledCardDetails {
    @JsonSerialize(using = ObjectIdSerializer.class)
    @JsonDeserialize(using = ObjectIdDeserializer.class)
    private ObjectId courseId;

    private String title;
    private List<Course.Content> contents;
    private List<Review> reviews;
    private String instructorName;
    private String instructorDesignation;
    private String instructorBio;
    private String instructor;
    private double rating;
}
