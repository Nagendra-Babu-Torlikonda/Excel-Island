package com.ExcelIsland.backend.services;

import com.ExcelIsland.backend.entity.*;
import com.ExcelIsland.backend.entity.dto.*;
import com.ExcelIsland.backend.repository.CourseRepository;
import com.ExcelIsland.backend.repository.InstructorRepository;
import com.ExcelIsland.backend.repository.StudentRepository;
import com.ExcelIsland.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.MongoExpression;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationExpression;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.ArrayOperators;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private InstructorRepository instructorRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MongoTemplate mongoTemplate;



    @Transactional
    public Student enrollCourse(ObjectId userId,ObjectId courseId) {
        Student student = studentRepository.findById(userId).orElse(null);
        if(student != null){

            if (student.getEnrolledCourses().contains(courseId)) {
                throw new RuntimeException("Student is already enrolled in this course");
            }

            student.getEnrolledCourses().add(courseId);
            return studentRepository.save(student);
        }
        return null;
    }

    public User getUserById(ObjectId userId) {
        return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Student completeCourse(ObjectId userId, ObjectId courseId) {
        Student student = studentRepository.findById(userId).orElse(null);

        if(student != null) {
            if (student.getEnrolledCourses().contains(courseId)) {
                student.getCompletedCourses().add(courseId);
                student.getEnrolledCourses().remove(courseId);
            }
            return studentRepository.save(student);
        }
        return null;
    }

    public Student addToCart(ObjectId userId,ObjectId courseId) {
        Student student = studentRepository.findById(userId).orElse(null);

        if(student != null) {
            if (!student.getCartCourses().contains(courseId)) {
                student.getCartCourses().add(courseId);
            }

            return studentRepository.save(student);
        }
        return null;
    }

    public Student deleteFromCart(ObjectId userId, ObjectId courseId) {
        Student student = studentRepository.findById(userId).orElse(null);

        if(student != null) {
            if (student.getCartCourses().contains(courseId)) {
                student.getCartCourses().remove(courseId);
            }
            return studentRepository.save(student);
        }
        return null;
    }

    public List<CourseCardView> enrolledCourses(ObjectId userId) {
        Student student = studentRepository.findById(userId).orElse(null);

        if(student != null) {
            Aggregation aggregation = newAggregation(
                    match(Criteria.where("_id").is(student.getId())),
                    unwind("enrolledCourses"),
                    lookup("courses", "enrolledCourses", "_id", "courseDetails"),
                    unwind("courseDetails"),
                    lookup("users", "courseDetails.instructor", "_id", "instructorDetails"),
                    unwind("instructorDetails"),
                    project()
                            .and("courseDetails._id").as("courseId")
                            .and("courseDetails.title").as("title")
                            .and("courseDetails.mode").as("mode")
                            .and("courseDetails.duration").as("duration")
                            .and("courseDetails.location").as("location")
                            .and("courseDetails.price").as("price")
                            .and("courseDetails.image").as("image")
                            .and("instructorDetails.username").as("instructorName")
            );

            AggregationResults<CourseCardView> results = mongoTemplate.aggregate(
                    aggregation, "users", CourseCardView.class
            );
            return results.getMappedResults();
        }
        return null;
    }

    public List<CourseCardView> completedCourses(ObjectId userId) {
        Student student = studentRepository.findById(userId).orElse(null);

        if(student != null) {
            Aggregation aggregation = newAggregation(
                    match(Criteria.where("_id").is(student.getId())),
                    unwind("completedCourses"),
                    lookup("courses", "completedCourses", "_id", "courseDetails"),
                    unwind("courseDetails"),
                    lookup("users", "courseDetails.instructor", "_id", "instructorDetails"),
                    unwind("instructorDetails"),
                    project()
                            .and("courseDetails._id").as("courseId")
                            .and("courseDetails.title").as("title")
                            .and("courseDetails.mode").as("mode")
                            .and("courseDetails.image").as("image")
                            .and("courseDetails.duration").as("duration")
                            .and("courseDetails.location").as("location")
                            .and("courseDetails.price").as("price")
                            .and("instructorDetails.username").as("instructorName")
            );

            AggregationResults<CourseCardView> results = mongoTemplate.aggregate(
                    aggregation, "users", CourseCardView.class
            );
            return results.getMappedResults();
        }
        return null;
    }

    public Course addReview(ReviewDTO reviewDTO) {
        ObjectId courseId = new ObjectId(reviewDTO.getCourseId());
        Review review = Review.builder()
                .reviewer(reviewDTO.getReviewer())
                .comment(reviewDTO.getComment())
                .rating(Integer.parseInt(reviewDTO.getRating()))
                .build();
        Course c = courseRepository.findById(courseId).get();
        c.getReviews().add(review);
        return courseRepository.save(c);
    }

    public CourseEnrolledCardDetails getEnrolledCourseWithInstructorDetails(ObjectId courseId) {
        Aggregation aggregation = newAggregation(
                match(Criteria.where("_id").is(courseId)),
                lookup("users", "instructor", "_id", "instructorDetails"),
                unwind("instructorDetails"),
                project( "title", "reviews", "instructor", "contents")
                        .and("_id").as("courseId")
                        .and("instructorDetails.username").as("instructorName")
                        .and("instructorDetails.designation").as("instructorDesignation")
                        .and("instructorDetails.bio").as("instructorBio")
                        .and(AggregationExpression.from(MongoExpression.create("{$cond: { if: { $gt: [ { $size: '$reviews' }, 0 ] }, then: { $round: [ { $avg: '$reviews.rating' }, 1 ] }, else: 0 }}"))).as("rating")
        );

        AggregationResults<CourseEnrolledCardDetails> results = mongoTemplate.aggregate(
                aggregation, "courses", CourseEnrolledCardDetails.class);

        return results.getUniqueMappedResult();
    }

    public List<CartCourseDTO> getAllCartCourses(ObjectId userId) {
        Aggregation aggregation = newAggregation(
                match(Criteria.where("_id").is(userId)),
                unwind("cartCourses"),
                lookup("courses", "cartCourses", "_id", "cartCourse"),
                unwind("cartCourse"),
                project()
                        .and("cartCourse._id").as("courseId")
                        .and("cartCourse.title").as("title")
                        .and("cartCourse.price").as("price")
        );
        AggregationResults<CartCourseDTO> results = mongoTemplate.aggregate(
                aggregation, "users", CartCourseDTO.class
        );
        return results.getMappedResults();
    }
}
