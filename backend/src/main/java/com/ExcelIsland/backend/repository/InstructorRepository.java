package com.ExcelIsland.backend.repository;

import com.ExcelIsland.backend.entity.Instructor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Repository;

@Repository
public interface InstructorRepository extends MongoRepository<Instructor, ObjectId> {

}

