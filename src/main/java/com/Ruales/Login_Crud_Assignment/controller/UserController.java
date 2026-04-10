package com.Ruales.Login_Crud_Assignment.controller;

import com.Ruales.Login_Crud_Assignment.model.User;
import com.Ruales.Login_Crud_Assignment.repository.UserRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User loginRequest) {
        Optional<User> userOptional = userRepository.findByUserName(loginRequest.getUserName());
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (BCrypt.checkpw(loginRequest.getPassword(), user.getPassword())) {
                return ResponseEntity.ok(user);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody User signupRequest) {
        signupRequest.setUserRole("user"); 
        
        String hashedPassword = BCrypt.hashpw(signupRequest.getPassword(), BCrypt.gensalt());
        signupRequest.setPassword(hashedPassword);
        
        User savedUser = userRepository.save(signupRequest);
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/dashboard/{userId}")
    public ResponseEntity<List<User>> getDashboardUsers(@PathVariable Long userId) {
        Optional<User> requester = userRepository.findById(userId);
        
        if (requester.isPresent()) {
            User user = requester.get();
            if ("admin".equals(user.getUserRole())) {
                return ResponseEntity.ok(userRepository.findAll());
            } else {
                return ResponseEntity.ok(Collections.singletonList(user));
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        return userRepository.save(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setUserName(userDetails.getUserName());
                    if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty() && !userDetails.getPassword().startsWith("$2a$")) {
                         user.setPassword(BCrypt.hashpw(userDetails.getPassword(), BCrypt.gensalt()));
                    } else if (userDetails.getPassword() != null && userDetails.getPassword().startsWith("$2a$")) {
                         user.setPassword(userDetails.getPassword());
                    }

                    user.setUserRole(userDetails.getUserRole());
                    return ResponseEntity.ok(userRepository.save(user));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    userRepository.delete(user);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
