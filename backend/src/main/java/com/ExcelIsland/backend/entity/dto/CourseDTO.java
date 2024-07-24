package com.ExcelIsland.backend.entity.dto;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CourseDTO {

    private String title;
    private String duration;
    private List<ContentDTO> contents;
    private String mode;
    private String location;
    private Long price;
    private MultipartFile demoVideo;
    private MultipartFile image;
    private String instructor;


    @Data
    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ContentDTO {
        private String text;
        private MultipartFile video;

    }
}

