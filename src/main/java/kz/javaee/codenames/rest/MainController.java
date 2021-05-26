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

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
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
        // Here I need to generate config
        // basically, it should be this way
        // reds nad blues are gonna be empty
        // board gonna be generated
        // depending on board, we should decide who has the first turn
        // redsCap and bluesCap are null
        // gameStarted is false
        // Result, Generated hecking MessageDto and transform it to the json object and write it down as config for the game
        GameRoom result = gameRoomService.createGameRoom(gameRoom);

        if (result != null) {
            result.setConfig(gameRoomService.generateConfigForGameRoom(result.getId()));
            result = gameRoomService.updateGameRoom(result);
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

    @PostMapping("/users")
    public ResponseEntity<?> getUsersByIds(@RequestBody List<Long> userIds) {
        List<User> users = new ArrayList<>();
        userIds.forEach(userId -> {
            users.add(userService.getUserById(userId));
        });
        return ResponseEntity.ok(users);
    }

}
