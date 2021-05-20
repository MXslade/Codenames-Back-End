package kz.javaee.codenames.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageDto implements Serializable {

    private String gameRoomId;

    private List<Long> userIds;

    private String config;

}
