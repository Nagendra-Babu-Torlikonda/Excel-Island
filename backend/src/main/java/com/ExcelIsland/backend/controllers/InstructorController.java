package com.ExcelIsland.backend.controllers;


import com.ExcelIsland.backend.entity.Course;
import com.ExcelIsland.backend.entity.dto.CourseDTO;
import com.ExcelIsland.backend.entity.dto.InstructorCoursesCardView;
import com.ExcelIsland.backend.entity.dto.InstructorReviewDTO;
import com.ExcelIsland.backend.services.InstructorService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/instructor")
@CrossOrigin
public class InstructorController {

    @Autowired
    private InstructorService instructorService;

    @GetMapping("/dashboard")
    public String getInstructorDashboard() {
        return "Instructor Dashboard";
    }

    @PostMapping("/createCourse")
    public ResponseEntity<?> createCourse(@ModelAttribute CourseDTO courseDTO) {
        System.out.println("In Controller : " + courseDTO.toString());
        Course c =  instructorService.createCourse(courseDTO);
        if(c != null)
            return ResponseEntity.ok(c);
        else
            return ResponseEntity.status(404).body("Unable to create course");
    }

    @GetMapping("/myCourses/{id}")
    public ResponseEntity<?> getInstructorCourses(@PathVariable String id){
        List<InstructorCoursesCardView> list = instructorService.getInstructorCourses(new ObjectId(id));
        if(list != null)
            return ResponseEntity.ok(list);
        else
            return ResponseEntity.noContent().build();
    }

    @GetMapping("/myReviews/{id}")
    public ResponseEntity<?> getInstructorReviews(@PathVariable String id){
        List<InstructorReviewDTO> reviewList = instructorService.getInstructorReviews(new ObjectId(id));
        if(reviewList != null)
            return ResponseEntity.ok(reviewList);
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("not found");
    }

    @DeleteMapping("/deleteCourse/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable String id){
        instructorService.deleteCourse(new ObjectId(id));
        return ResponseEntity.ok("deletion successful");
    }

    @PutMapping("/updateCourse/{courseId}")
    public String updateCourse(@PathVariable String courseId) {
        // Logic to update a course
        return "Course updated successfully";
    }
}
