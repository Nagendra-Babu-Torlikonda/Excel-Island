package com.ExcelIsland.backend.services;

import com.ExcelIsland.backend.entity.BlogPost;
import com.ExcelIsland.backend.entity.Instructor;
import com.ExcelIsland.backend.entity.Student;
import com.ExcelIsland.backend.entity.dto.BlogPostDTO;
import com.ExcelIsland.backend.entity.User;
import com.ExcelIsland.backend.entity.dto.InstructorDTO;
import com.ExcelIsland.backend.entity.dto.StudentDTO;
import com.ExcelIsland.backend.repository.BlogPostRepository;
import com.ExcelIsland.backend.repository.InstructorRepository;
import com.ExcelIsland.backend.repository.StudentRepository;
import com.ExcelIsland.backend.repository.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;

@Service
public class PublicService {

    @Value("${file.blog-upload-dir}")
    private String blog_dir;

    @Value("${file.profile-upload-dir}")
    private String profile_dir;

    @Autowired
    private BlogPostRepository blogPostRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private InstructorRepository instructorRepository;

    public BlogPost addBlogPost(BlogPostDTO blogPostDTO){
        User u = userRepository.findById(new ObjectId(blogPostDTO.getUserId())).orElse(null);
        System.out.println(u.toString());
        if(u != null && (u.getRole().equals("ROLE_INSTRUCTOR") || u.getRole().equals("ROLE_Admin"))) {
            String imageFileName = SaveFile.saveFile(blogPostDTO.getImage(), blogPostDTO.getTitle(), blog_dir);
            BlogPost b = new BlogPost();
            b.setTitle(blogPostDTO.getTitle());
            b.setAuthor(u.getUsername());
            b.setContent(blogPostDTO.getContent());
            b.setImage(imageFileName);
            b.setDate(new Date());
            return blogPostRepository.save(b);
        }
        return null;
    }

    public User userLogin(String email, String password){
        User user = userRepository.findByEmail(email).orElse(null);
        // Check if user exists and validate the provided password
        if (user != null && new BCryptPasswordEncoder().matches(password, user.getPassword())) {
            return user; // Return the user if password matches
        } else {
            return null; // Return null if user does not exist or password does not match
        }
    }



    public User addStudent(StudentDTO s) {
        String profilepicname = "";
        System.out.println();
        if(s.getProfilePic() != null)
            profilepicname = SaveFile.saveFile(s.getProfilePic(), s.getUsername(), profile_dir);
        Student st = new Student();
        st.setUsername(s.getUsername());
        st.setEmail(s.getEmail());
        st.setGender(s.getGender());
        st.setRole(s.getRole());
        st.setPassword(s.getPassword());
        st.setProfilePic(profilepicname);
        st.setDob(s.getDob());

        return studentRepository.save(st);
    }

    public User addInstructor(InstructorDTO i){
        String profilepicname = "";
        if(i.getProfilePic() != null)
            profilepicname = SaveFile.saveFile(i.getProfilePic(), i.getUsername(), profile_dir);
        Instructor inst = new Instructor();
        inst.setUsername(i.getUsername());
        inst.setRole(i.getRole());
        inst.setDob(i.getDob());
        inst.setGender(i.getGender());
        inst.setEmail(i.getEmail());
        inst.setPassword(i.getPassword());
        inst.setProfilePic(profilepicname);
        inst.setBio(i.getBio());
        inst.setDesignation(i.getDesignation());
        inst.setContacts(i.getContacts());

        return instructorRepository.save(inst);
    }
}
