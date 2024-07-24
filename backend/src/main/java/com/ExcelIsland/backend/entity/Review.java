package com.ExcelIsland.backend.entity;

import lombok.*;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Review {
    private String reviewer;
    private int rating;
    private String comment;
}
