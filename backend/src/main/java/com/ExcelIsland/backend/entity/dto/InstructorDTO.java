package com.ExcelIsland.backend.entity.dto;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.Map;
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class InstructorDTO {

    private String username;
    private String email;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dob;
    private String gender;
    private String password;
    private MultipartFile profilePic;
    private String role;
    private String bio;
    private String designation;
    private Map<String, String> contacts;
}
