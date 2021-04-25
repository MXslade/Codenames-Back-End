package kz.javaee.codenames.rest;

import kz.javaee.codenames.dto.MessageDto;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
public class SocketController {

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public MessageDto getMessageDto(MessageDto messageDto) throws Exception {
        Thread.sleep(1000);
        System.out.println(messageDto.getName());
        return new MessageDto("server", "server says yay");
    }

}
