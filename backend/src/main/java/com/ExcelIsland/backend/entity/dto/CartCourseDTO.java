package com.ExcelIsland.backend.entity.dto;

import com.ExcelIsland.backend.config.ObjectIdDeserializer;
import com.ExcelIsland.backend.config.ObjectIdSerializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.*;
import org.bson.types.ObjectId;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CartCourseDTO {
    @JsonSerialize(using = ObjectIdSerializer.class)
    @JsonDeserialize(using = ObjectIdDeserializer.class)
    private ObjectId courseId;
    private String title;
    private Long price;
}
