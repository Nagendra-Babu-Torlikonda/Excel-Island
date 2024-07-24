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
public class CourseCardView {


    @JsonSerialize(using = ObjectIdSerializer.class)
    @JsonDeserialize(using = ObjectIdDeserializer.class)
    private ObjectId courseId;

    private String title;
    private String mode;
    private String location;
    private String image;
    private String duration;
    private Long price;
    private String instructorName;
}
