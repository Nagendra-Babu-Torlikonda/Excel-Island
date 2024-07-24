package com.ExcelIsland.backend.repository;

import com.ExcelIsland.backend.entity.Student;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StudentRepository extends MongoRepository<Student, ObjectId> {
}
