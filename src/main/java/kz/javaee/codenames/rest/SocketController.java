package kz.javaee.codenames.rest;

import kz.javaee.codenames.dto.MessageDto;
import kz.javaee.codenames.models.GameRoom;
import kz.javaee.codenames.models.User;
import kz.javaee.codenames.services.GameRoomService;
import kz.javaee.codenames.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;
import java.util.List;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
public class SocketController {

    @Autowired
    private GameRoomService gameRoomService;
    @Autowired
    private UserService userService;

    @MessageMapping("/hello")
    @SendTo("/game-broadcaster")
    public MessageDto getMessageDto(MessageDto messageDto) throws Exception {
        Thread.sleep(1000);
        return new MessageDto("", null, "server says yay");
    }

    @MessageMapping("/update-config/{gameRoomId}")
    @SendTo("/game-broadcaster/{gameRoomId}")
    public MessageDto updateGameBoardConfig(@DestinationVariable Long gameRoomId,
                                            MessageDto messageDto) {
        Long id = Long.parseLong(messageDto.getGameRoomId());
        GameRoom gameRoom = gameRoomService.getGameRoomById(id);
        if (gameRoom != null) {
            gameRoom.setConfig(messageDto.getConfig());
            List<User> usersToAdd = new ArrayList<>();
            messageDto.getUserIds().forEach(userId -> {
                long num = gameRoom.getUsers().stream().filter(userItem -> userItem.getId().equals(userId)).count();
                if (num < 1) {
                    usersToAdd.add(userService.getUserById(userId));
                }
            });
            gameRoom.getUsers().addAll(usersToAdd);
            gameRoomService.updateGameRoom(gameRoom);
        }

        return new MessageDto(gameRoom.getId().toString(), messageDto.getUserIds(), gameRoom.getConfig());
    }

}
