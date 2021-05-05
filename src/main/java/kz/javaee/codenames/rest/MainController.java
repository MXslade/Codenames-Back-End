package kz.javaee.codenames.rest;

import kz.javaee.codenames.dto.UserDto;
import kz.javaee.codenames.models.GameRoom;
import kz.javaee.codenames.models.User;
import kz.javaee.codenames.services.GameRoomService;
import kz.javaee.codenames.services.UserDataService;
import kz.javaee.codenames.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api")
public class MainController {

    private final UserService userService;
    private final UserDataService userDataService;
    private final PasswordEncoder passwordEncoder;
    private final GameRoomService gameRoomService;

    public MainController(UserService userService, UserDataService userDataService, PasswordEncoder passwordEncoder, GameRoomService gameRoomService) {
        this.userService = userService;
        this.userDataService = userDataService;
        this.passwordEncoder = passwordEncoder;
        this.gameRoomService = gameRoomService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDto userDto) {
        User result = userService.addUser(userDto.getEmail(), userDto.getUsername(), userDto.getPassword(), userDto.getFullName());

        if (result != null) {
            return ResponseEntity.ok(result);
        }

        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/user-data")
    public ResponseEntity<?> getUserData() {
        User user = userDataService.getCurrentUser();
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/game-rooms")
    public ResponseEntity<?> getGameRooms() {
        List<GameRoom> gameRooms = gameRoomService.getAllGameRooms();
        return ResponseEntity.ok(gameRooms);
    }

    @PostMapping("/game-rooms")
    public ResponseEntity<?> createGameRoom(@RequestBody GameRoom gameRoom) {
        GameRoom result = gameRoomService.createGameRoom(gameRoom);

        if (result != null) {
            return ResponseEntity.ok(result);
        }

        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/game-room/{gameRoomId}")
    public ResponseEntity<?> getGameRoom(@PathVariable(name = "gameRoomId") Long gameRoomId) {
        GameRoom gameRoom = gameRoomService.getGameRoomById(gameRoomId);
        if (gameRoom != null) {
            return ResponseEntity.ok(gameRoom);
        }
        return ResponseEntity.badRequest().build();
    }

}
