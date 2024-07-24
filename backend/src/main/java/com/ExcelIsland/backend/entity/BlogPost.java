package com.ExcelIsland.backend.entity;

import com.ExcelIsland.backend.config.ObjectIdDeserializer;
import com.ExcelIsland.backend.config.ObjectIdSerializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.Id;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.Date;

@Document(collection = "blogs")
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BlogPost {
    @Id
    @JsonSerialize(using = ObjectIdSerializer.class)
    @JsonDeserialize(using = ObjectIdDeserializer.class)
    private ObjectId id;
    private String title;
    private String author;
    private String image;
    private Date date;
    private String content;
}
