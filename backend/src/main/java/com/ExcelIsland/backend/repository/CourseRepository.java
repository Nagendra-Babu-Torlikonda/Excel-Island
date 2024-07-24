package com.ExcelIsland.backend.repository;

import com.ExcelIsland.backend.entity.Course;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.bson.types.ObjectId;

import java.util.Optional;

public interface CourseRepository extends MongoRepository<Course, ObjectId> {
    Optional<Course> findByTitle(String title);
}

