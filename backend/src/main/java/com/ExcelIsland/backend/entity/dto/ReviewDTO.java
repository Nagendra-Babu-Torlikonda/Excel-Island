package com.ExcelIsland.backend.entity.dto;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDTO {
    private String reviewer;
    private String rating;
    private String comment;
    private String courseId;
}
