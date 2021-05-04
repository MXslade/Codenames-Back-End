package kz.javaee.codenames.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageDto implements Serializable {

    private String gameRoomId;

    private String users;

    private String config;

}
