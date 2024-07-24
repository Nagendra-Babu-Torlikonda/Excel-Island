package com.ExcelIsland.backend.entity.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BlogPostDTO {
    private String title;
    private MultipartFile image;
    private String content;
    private String userId;
}
