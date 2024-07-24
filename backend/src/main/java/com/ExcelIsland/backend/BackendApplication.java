package com.ExcelIsland.backend;

import com.ExcelIsland.backend.entity.User;
import com.ExcelIsland.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class BackendApplication {

	@Autowired
	UserRepository userRepository;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
		PasswordEncoder p = new BCryptPasswordEncoder();
		System.out.println(p.encode("password123"));

	}

	@Component
	public class MyCommandLineRunner implements CommandLineRunner {

		@Override
		public void run(String... args) throws Exception {
			System.out.println("Spring Application Started");
//			User u = userRepository.findByUsername("admin_user");
//			if (u != null) {
//				System.out.println(u.getPassword());
//			} else {
//				System.out.println("User not found");
//			}
		}
	}
}
