package com.ExcelIsland.backend.controllers;

import com.ExcelIsland.backend.entity.*;
import com.ExcelIsland.backend.entity.dto.*;
import com.ExcelIsland.backend.repository.BlogPostRepository;
import com.ExcelIsland.backend.repository.InstructorRepository;
import com.ExcelIsland.backend.repository.StudentRepository;
import com.ExcelIsland.backend.repository.UserRepository;
import com.ExcelIsland.backend.services.CourseService;
import com.ExcelIsland.backend.services.InstructorService;
import com.ExcelIsland.backend.services.PublicService;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
@CrossOrigin
public class PublicController {

    @Autowired
    CourseService courseService;

    @Autowired
    PublicService publicService;

    @Autowired
    InstructorService instructorService;

    @Autowired
    BlogPostRepository blogPostRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JavaMailSender sender;
    @GetMapping("/blogs/getAll")
    public List<BlogPost> getAllBlogPosts(){
        return blogPostRepository.findAll();
    }

    @PostMapping("/addBlog")
    public ResponseEntity<?> addBlogPost(@ModelAttribute BlogPostDTO blogPostDTO){
        System.out.println(blogPostDTO.toString());
        BlogPost b = publicService.addBlogPost(blogPostDTO);
        if(b != null)
            return ResponseEntity.ok(b);
        else
            return ResponseEntity.status(404).body("unable to add");
    }

    @GetMapping("/courses/{id}")
    public ResponseEntity<?> courseView(@PathVariable String id){
        ObjectId objId = new ObjectId(id);
       CourseDetails l =  courseService.getCourseWithInstructorDetails(objId);
        return ResponseEntity.ok(l);
    }

    @GetMapping("/courses/cardview")
    public ResponseEntity<?> getCardView(){
        List<CourseCardView> l =  courseService.getAllCoursesCardView();
        return ResponseEntity.ok(l);
    }

    @GetMapping("/instructors/cardview")
    public ResponseEntity<?> getInstructorsCardView(){
        List<InstructorCardView> l = instructorService.getInstructorsCardView();
        return ResponseEntity.ok(l);
    }

    @GetMapping("/instructors/{id}")
    public ResponseEntity<?> getInstructorDetails(@PathVariable String id){
        InstructorDetails i = instructorService.getInstructorDetails(new ObjectId(id));
        return ResponseEntity.ok(i);
    }

    @PostMapping("/login")
    public ResponseEntity<?> LoginPage(@RequestBody LoginRequest l){
        User u = publicService.userLogin(l.getEmail(), l.password);
        if(u != null)
            return ResponseEntity.ok(u);
        else
            return ResponseEntity.status(404).body("User not found");
    }

    @PostMapping("/addStudent")
    public ResponseEntity<?> addStudent(@ModelAttribute StudentDTO s){
        PasswordEncoder p = new BCryptPasswordEncoder();
        String encoded = p.encode(s.getPassword());
        s.setPassword(encoded);
        User u =  publicService.addStudent(s);
        if(u != null)
            return ResponseEntity.ok(u);
        else
            return ResponseEntity.status(404).body("Unable to process");
    }

    @PostMapping("/addInstructor")
    public ResponseEntity<?> addInstructor(@ModelAttribute InstructorDTO i){
        PasswordEncoder p = new BCryptPasswordEncoder();
        String encoded = p.encode(i.getPassword());
        i.setPassword(encoded);
        User u = publicService.addInstructor(i);
        if(u != null) {
            return ResponseEntity.ok(u);
        }
        else
            return ResponseEntity.status(404).body("Unable to process");
    }

    @PostMapping("/forgotPassword")
    public ResponseEntity<?> forgotPassword(@RequestBody String email){
        String decodedString = URLDecoder.decode(email.substring(0,email.length() - 1), StandardCharsets.UTF_8);
        User user =  userRepository.findByEmail(decodedString).orElse(null);
        if(user != null) {

            String otp = generateOtp(6);
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(decodedString);
            message.setSubject("For Confirmation");
            message.setText(otp + " is the OTP(One Time Password) to login");
            sender.send(message);
            return ResponseEntity.ok(otp);
        }
        else{
            return ResponseEntity.status(404).body("email not found");
        }
    }

    @PostMapping("/newPassword")
    public ResponseEntity<?> setNewPassword(@RequestBody LoginRequest lr){
        User u = userRepository.findByEmail(lr.getEmail()).orElse(null);
        PasswordEncoder p = new BCryptPasswordEncoder();
        String encoded = p.encode(lr.getPassword());
        u.setPassword(encoded);
        return ResponseEntity.ok(userRepository.save(u));
    }

    private String generateOtp(int l) {
        String nums = "0123456789";
        String otp = "";
        Random r = new Random();
        for(int i = 0; i < l; i++)
            otp += nums.charAt(r.nextInt(nums.length()));
        return otp;
    }

    @PostMapping("/sendContactus")
    public ResponseEntity<?> sendContactUs(@RequestBody ContactUs c){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(c.getEmail());
        message.setSubject("Query from " + c.getName());
        message.setText(c.getMessage());
        sender.send(message);
        return ResponseEntity.ok().build();
    }
}
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
class LoginRequest{
    String email;
    String password;
}
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
class ContactUs{
    String email;
    String name;
    String message;
}

