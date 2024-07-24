package com.ExcelIsland.backend.controllers;


import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @GetMapping("/dashboard")
    public String getAdminDashboard() {
        return "Admin Dashboard";
    }

    @PostMapping("/addCourse")
    public String addCourse() {
        // Logic to add a course
        return "Course added successfully";
    }

    @DeleteMapping("/deleteCourse/{courseId}")
    public String deleteCourse(@PathVariable String courseId) {
        // Logic to delete a course
        return "Course deleted successfully";
    }
}
