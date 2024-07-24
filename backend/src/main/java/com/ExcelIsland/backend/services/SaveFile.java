package com.ExcelIsland.backend.services;

import org.apache.commons.io.FilenameUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

public class SaveFile {
    public static String saveFile(MultipartFile file, String name, String dir)  {
        String uniqueID = UUID.randomUUID().toString();
        String fileName =  uniqueID + "_" +name + "." + FilenameUtils.getExtension(file.getOriginalFilename());
        fileName = fileName.replace(" ", "_");
        Path filePath = Paths.get(dir + fileName);

        try {
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());
        } catch (IOException e) {
            return "unable to save file";
        }

        return fileName;
    }
}
