package kz.javaee.codenames.services.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import kz.javaee.codenames.dto.MessageDto;
import kz.javaee.codenames.services.DtoTransformService;
import org.springframework.stereotype.Service;

@Service
public class DtoTransformServiceImpl implements DtoTransformService {

    private final ObjectMapper objectMapper;

    public DtoTransformServiceImpl() {
        this.objectMapper = new ObjectMapper();
    }

    @Override
    public String fromMessageDtoToString(MessageDto messageDto) {
        try {
            return objectMapper.writeValueAsString(messageDto);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public MessageDto fromStringToMessageDto(String jsonString) {
        try {
            return objectMapper.readValue(jsonString, MessageDto.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }
}
