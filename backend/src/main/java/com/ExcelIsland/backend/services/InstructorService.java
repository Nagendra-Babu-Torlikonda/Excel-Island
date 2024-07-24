package com.ExcelIsland.backend.services;

import com.ExcelIsland.backend.entity.Course;
import com.ExcelIsland.backend.entity.dto.*;
import com.ExcelIsland.backend.entity.Instructor;
import com.ExcelIsland.backend.repository.CourseRepository;
import com.ExcelIsland.backend.repository.InstructorRepository;
import com.ExcelIsland.backend.repository.UserRepository;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.MongoExpression;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import java.util.*;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

@Service
public class InstructorService {

    @Value("${file.video-upload-dir}")
    private String video_dir;

    @Value("${file.images-upload-dir}")
    private String image_dir;

    @Autowired
    private InstructorRepository instructorRepo;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Optional<Instructor> getInstructorById(ObjectId id) {
        return instructorRepo.findById(id);
    }

    public Course createCourse(CourseDTO courseDTO){
        try {
            System.out.println("Received in Service :" + courseDTO.toString());
            String imageFileName = SaveFile.saveFile(courseDTO.getImage(), courseDTO.getTitle(), image_dir);
            String demoVideoFileName = SaveFile.saveFile(courseDTO.getDemoVideo(), "demoVideo", video_dir);

            // Process contents with files
            List<Course.Content> courseContents = new ArrayList<>();
            for (CourseDTO.ContentDTO contentDTO : courseDTO.getContents()) {
                String videoFileName = SaveFile.saveFile(contentDTO.getVideo(), contentDTO.getText(), video_dir);
                System.out.println(videoFileName);
                courseContents.add(new Course.Content(contentDTO.getText(), videoFileName));
            }

            System.out.println("files saved");

            // Create Course object
            Course course = new Course();
            course.setId(new ObjectId());
            course.setTitle(courseDTO.getTitle());
            course.setDuration(courseDTO.getDuration());
            course.setContents(courseContents);
            course.setMode(courseDTO.getMode());
            course.setPrice(courseDTO.getPrice());
            course.setDemoVideo(demoVideoFileName);
            course.setImage(imageFileName);
            course.setReviews(new ArrayList<>());
            System.out.println("Object id: " + courseDTO.getInstructor());
            course.setInstructor(new ObjectId(courseDTO.getInstructor()));

            System.out.println("course set");

            // Optional: Set location if mode is offline
            if ("offline".equals(courseDTO.getMode())) {
                course.setLocation(courseDTO.getLocation());
            }

            System.out.println(course.toString());
            return courseRepository.save(course);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    public List<InstructorCoursesCardView> getInstructorCourses(ObjectId instructorid) {
        AggregationExpression getNoOfStudentsExpr = new AggregationExpression() {

            @Override
            public Document toDocument(AggregationOperationContext context) {
                return new Document("$function", new Document("body", "countStudentsEnrolled").append("args", Arrays.asList("$id")).append("lang", "java"));
            }
        };
        Instructor i = instructorRepo.findById(instructorid).orElse(null);
        if (i != null) {
            LookupOperation lookupOperation = LookupOperation.newLookup()
                    .from("courses")
                    .localField("instructor")
                    .foreignField("_id")
                    .as("instructorDetails");

            Aggregation aggregation = Aggregation.newAggregation(
                    match(Criteria.where("instructor").is(i.getId())),
                    Aggregation.project()
                            .and("id").as("id")
                            .and("title").as("title")
                            .and("image").as("image")
                            .and("duration").as("duration")
                            .and("price").as("price")
                            .and(AggregationExpression.from(MongoExpression.create("{$cond: { if: { $gt: [ { $size: '$reviews' }, 0 ] }, then: { $round: [ { $avg: '$reviews.rating' }, 1 ] }, else: 0 }}")))
                            .as("rating")

            );
            AggregationResults<InstructorCoursesCardView> results = mongoTemplate.aggregate(aggregation, "courses", InstructorCoursesCardView.class);
            return results.getMappedResults();
        }
        return null;
    }


    public List<InstructorReviewDTO> getInstructorReviews(ObjectId instructorId) {
        Aggregation aggregation = Aggregation.newAggregation(
                match(Criteria.where("instructor").is(instructorId)),
                unwind("reviews"),
                Aggregation.project("title")
                        .and("reviews.reviewer").as("reviewer")
                        .and("reviews.rating").as("rating")
                        .and("reviews.comment").as("comment")
        );

        AggregationResults<InstructorReviewDTO> results = mongoTemplate.aggregate(aggregation, "courses", InstructorReviewDTO.class);
        return results.getMappedResults();
    }

    public void deleteCourse(ObjectId courseId){
        courseRepository.deleteById(courseId);
    }

    public List<InstructorCardView> getInstructorsCardView() {

        LookupOperation lookupOperation = LookupOperation.newLookup()
                .from("courses")
                .localField("_id")
                .foreignField("instructor")
                .as("courses");

        UnwindOperation unwindCourses = Aggregation.unwind("courses");

        AggregationOperation groupOperation = Aggregation.group("courses.instructor")
                .first("_id").as("id")
                .first("username").as("username")
                .first("designation").as("designation")
                .first("contacts").as("contacts")
                .first("profilePic").as("profilePic")
                .count().as("noOfCourses");

        AggregationOperation projectOperation = Aggregation.project("_id", "username", "designation","profilePic", "contacts", "noOfCourses");

        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.match(Criteria.where("role").is("ROLE_INSTRUCTOR")),
                lookupOperation,
                unwindCourses,
                groupOperation,
                projectOperation
        );

        AggregationResults<InstructorCardView> results = mongoTemplate.aggregate(aggregation, "users", InstructorCardView.class);
        return results.getMappedResults();
    }

    public InstructorDetails getInstructorDetails(ObjectId userId) {
        Instructor i = instructorRepo.findById(userId).orElse(null);
        if (i != null) {
            Aggregation aggregation = Aggregation.newAggregation(
                    match(Criteria.where("_id").is(i.getId()).and("role").is("ROLE_INSTRUCTOR")),
                    lookup("courses", "_id", "instructor", "courses"),
                    unwind("courses", true), // Allow empty courses array
                    group("_id")
                            .first("_id").as("id")
                            .first("designation").as("designation")
                            .first("profilePic").as("profilePic")
                            .first("bio").as("bio")
                            .first("username").as("username")
                            .first("contacts").as("contacts")
                            .push(new Document("courseId", "$courses._id").append("title", "$courses.title")).as("courses")
            );

            AggregationResults<InstructorDetails> results = mongoTemplate.aggregate(aggregation, "users", InstructorDetails.class);
            InstructorDetails instructorDetails = results.getUniqueMappedResult();
            instructorDetails.setReviews(this.getInstructorReviews(userId));
            return instructorDetails;
        }
        return null;
    }


}
