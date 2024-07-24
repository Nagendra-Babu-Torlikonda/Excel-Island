package com.ExcelIsland.backend.repository;

import com.ExcelIsland.backend.entity.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, ObjectId> {
    User findByUsername(String username);
    Optional<User> findByEmail(String email);

}
