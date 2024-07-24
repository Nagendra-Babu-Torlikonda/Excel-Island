package com.ExcelIsland.backend.entity.dto;

import com.ExcelIsland.backend.config.ObjectIdDeserializer;
import com.ExcelIsland.backend.config.ObjectIdSerializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.*;
import org.bson.types.ObjectId;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InstructorCoursesCardView {


    @JsonSerialize(using = ObjectIdSerializer.class)
    @JsonDeserialize(using = ObjectIdDeserializer.class)
    private ObjectId id;

    private String title;
    private String image;
//    private String mode;
//    private String location;
    private String duration;
    private Long price;
//    private long noOfStudents;
    private double rating;
}

