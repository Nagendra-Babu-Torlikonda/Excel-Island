package com.ExcelIsland.backend.services;

import com.ExcelIsland.backend.entity.dto.CourseCardView;
import com.ExcelIsland.backend.entity.dto.CourseDetails;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.MongoExpression;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

@Service
public class CourseService {

    @Autowired
    private MongoTemplate mongoTemplate;

    public CourseDetails getCourseWithInstructorDetails(ObjectId courseId) {
        Aggregation aggregation = newAggregation(
                match(Criteria.where("_id").is(courseId)),
                lookup("users", "instructor", "_id", "instructorDetails"),
                unwind("instructorDetails"),
                project( "title", "demoVideo","reviews",  "price", "duration", "mode", "location","instructor")
                        .and("_id").as("courseId")
                        .and("contents.content").as("contents")
                        .and("instructorDetails.username").as("instructorName")
                        .and("instructorDetails.designation").as("instructorDesignation")
                        .and("instructorDetails.bio").as("instructorBio")
                        .and(AggregationExpression.from(MongoExpression.create("{$cond: { if: { $gt: [ { $size: '$reviews' }, 0 ] }, then: { $round: [ { $avg: '$reviews.rating' }, 1 ] }, else: 0 }}"))).as("rating")
        );

        AggregationResults<CourseDetails> results = mongoTemplate.aggregate(
                aggregation, "courses", CourseDetails.class);

        return results.getUniqueMappedResult();
    }


        public List<CourseCardView> getAllCoursesCardView() {
            LookupOperation lookupOperation = LookupOperation.newLookup()
                    .from("users")
                    .localField("instructor")
                    .foreignField("_id")
                    .as("instructorDetails");

            Aggregation aggregation = Aggregation.newAggregation(
                    Aggregation.match(new Criteria()),
                    lookupOperation,
                    Aggregation.unwind("instructorDetails", false),
                    Aggregation.project()
                            .and("_id").as("courseId")
                            .and("title").as("title")
                            .and("mode").as("mode")
                            .and("duration").as("duration")
                            .and("location").as("location")
                            .and("image").as("image")
                            .and("price").as("price")
                            .and("instructorDetails.username").as("instructorName")
            );

            AggregationResults<CourseCardView> results = mongoTemplate.aggregate(aggregation, "courses", CourseCardView.class);
            return results.getMappedResults();
        }
}
