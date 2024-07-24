package com.ExcelIsland.backend.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
public class BlogController {

    @Value("${file.blog-upload-dir}")
    private String uploadDir;

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("image") MultipartFile file) {
        try {
            String uniqueID = UUID.randomUUID().toString();
            String fileName = uniqueID + file.getOriginalFilename();
            String filePath = uploadDir + fileName;
            System.out.println(fileName);
            File dest = new File(filePath);
            dest.getParentFile().mkdirs();
            file.transferTo(dest);
            return "File uploaded successfully: " + filePath;
        } catch (IOException e) {
            return "Error uploading the file: " + e.getMessage();
        }
    }
}

