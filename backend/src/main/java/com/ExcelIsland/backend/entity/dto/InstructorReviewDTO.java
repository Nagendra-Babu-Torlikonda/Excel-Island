package com.ExcelIsland.backend.entity.dto;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InstructorReviewDTO {
    private String title;
    private String reviewer;
    private int rating;
    private String comment;
}
