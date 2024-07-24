package com.ExcelIsland.backend.controllers;


import com.ExcelIsland.backend.entity.Course;
import com.ExcelIsland.backend.entity.Review;
import com.ExcelIsland.backend.entity.dto.*;
import com.ExcelIsland.backend.entity.Student;
import com.ExcelIsland.backend.services.StudentService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    StudentService studentService;

    @PostMapping("/enrollCourse")
    public ResponseEntity<?> enrollCourse(@RequestBody Map<String, String> enroll) {
        String userId = enroll.get("userId");
        String courseId = enroll.get("courseId");
       Student st =  studentService.enrollCourse(new ObjectId(userId),new ObjectId(courseId));
        return ResponseEntity.ok().build();
    }

    @GetMapping("/getAllEnrolledCourses/{userId}")
    public List<CourseCardView> enrolledCourses(@PathVariable String userId) {
        List<CourseCardView> c =  studentService.enrolledCourses(new ObjectId(userId));
        return c;
    }

    @GetMapping("/getAnEnrolledCourse/{id}")
    public ResponseEntity<?> courseView(@PathVariable String id){
        ObjectId objId = new ObjectId(id);
        CourseEnrolledCardDetails l =  studentService.getEnrolledCourseWithInstructorDetails(objId);
        return ResponseEntity.ok(l);
    }

    @PostMapping("/completeCourse")
    public ResponseEntity<?> completeCourse(@RequestBody Map<String, String> courseMap) {
        String userId = courseMap.get("userId");
        String courseId = courseMap.get("courseId");
        Student s =  studentService.completeCourse(new ObjectId(userId), new ObjectId(courseId));
        return ResponseEntity.ok().build();
    }

    @GetMapping("/getAllCompletedCourses/{userId}")
    public ResponseEntity<?> completedCourses(@PathVariable String userId) {
        List<CourseCardView> c =  studentService.completedCourses(new ObjectId(userId));
        return ResponseEntity.ok(c);
    }

    @PostMapping("/addToCart")
    public ResponseEntity<?> addToCart(@RequestBody Map<String, String> courseMap) {
        String userId = courseMap.get("userId");
        String courseId = courseMap.get("courseId");
        Student s =  studentService.addToCart(new ObjectId(userId),new ObjectId(courseId));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/deleteFromCart")
    public ResponseEntity<?> deleteFromCart(@RequestBody Map<String, String> courseMap) {
        String userId = courseMap.get("userId");
        String courseId = courseMap.get("courseId");
        Student s =  studentService.deleteFromCart(new ObjectId(userId), new ObjectId(courseId));
        List<CartCourseDTO> l = studentService.getAllCartCourses(new ObjectId(userId));
        return ResponseEntity.ok(l);
    }

    @GetMapping("/getCartCourses/{id}")
    public ResponseEntity<?> getCartCourses(@PathVariable String id){
        List<CartCourseDTO> l = studentService.getAllCartCourses(new ObjectId(id));
        return ResponseEntity.ok(l);
    }

    @PostMapping("/addReview")
    public ResponseEntity<?> addReview(@RequestBody ReviewDTO reviewDTO){
        Course c = studentService.addReview(reviewDTO);
        return ResponseEntity.ok(c);
    }
}
