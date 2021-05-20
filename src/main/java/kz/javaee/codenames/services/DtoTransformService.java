package kz.javaee.codenames.services;

import kz.javaee.codenames.dto.MessageDto;
import org.springframework.messaging.Message;

public interface DtoTransformService {

    String fromMessageDtoToString(MessageDto messageDto);

    MessageDto fromStringToMessageDto(String jsonString);

}
