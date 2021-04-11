package kz.javaee.codenames.rest;

import kz.javaee.codenames.dto.UserDto;
import kz.javaee.codenames.models.User;
import kz.javaee.codenames.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api")
public class MainController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public MainController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDto userDto) {
        User result = userService.addUser(userDto.getEmail(), userDto.getUsername(), userDto.getPassword(), userDto.getFullName());

        if (result != null) {
            return ResponseEntity.ok(result);
        }

        return ResponseEntity.badRequest().build();
    }
}
