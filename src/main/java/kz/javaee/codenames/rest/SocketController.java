package kz.javaee.codenames.rest;

import kz.javaee.codenames.dto.MessageDto;
import kz.javaee.codenames.models.GameRoom;
import kz.javaee.codenames.services.DtoTransformService;
import kz.javaee.codenames.services.GameRoomService;
import kz.javaee.codenames.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin(origins = "*")
public class SocketController {

    @Autowired
    private GameRoomService gameRoomService;
    @Autowired
    private UserService userService;
    @Autowired
    private DtoTransformService dtoTransformService;

    @MessageMapping("/hello")
    @SendTo("/game-broadcaster")
    public MessageDto getMessageDto(MessageDto messageDto) throws Exception {
        Thread.sleep(1000);
        return new MessageDto();
    }

    @MessageMapping("/update-config/{gameRoomId}")
    @SendTo("/game-broadcaster/{gameRoomId}")
    public MessageDto updateGameBoardConfig(@DestinationVariable Long gameRoomId,
                                            MessageDto messageDto) {
        Long id = Long.parseLong(messageDto.getGameRoomId());
        GameRoom gameRoom = gameRoomService.getGameRoomById(id);
        if (gameRoom != null) {
            String oldConfig = gameRoom.getConfig();
            String newConfig = dtoTransformService.fromMessageDtoToString(messageDto);
            if (!oldConfig.equals(newConfig)) {
                gameRoom.setConfig(newConfig);
                gameRoomService.updateGameRoom(gameRoom);
            }
        }

        assert gameRoom != null;
        return dtoTransformService.fromStringToMessageDto(gameRoom.getConfig());
    }

}
