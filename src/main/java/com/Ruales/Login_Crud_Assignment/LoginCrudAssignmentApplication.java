package com.Ruales.Login_Crud_Assignment;

import com.Ruales.Login_Crud_Assignment.model.User;
import com.Ruales.Login_Crud_Assignment.repository.UserRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class LoginCrudAssignmentApplication {

	public static void main(String[] args) {
		SpringApplication.run(LoginCrudAssignmentApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(UserRepository userRepository) {
		return args -> {
			if (userRepository.count() == 0) {
				userRepository.save(new User(null, "admin", BCrypt.hashpw("admin", BCrypt.gensalt()), "admin"));
				userRepository.save(new User(null, "user", BCrypt.hashpw("user", BCrypt.gensalt()), "user"));
			}
		};
	}
}
