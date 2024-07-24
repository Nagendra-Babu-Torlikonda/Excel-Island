package com.ExcelIsland.backend.repository;

import com.ExcelIsland.backend.entity.BlogPost;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BlogPostRepository extends MongoRepository<BlogPost, ObjectId> {
}

