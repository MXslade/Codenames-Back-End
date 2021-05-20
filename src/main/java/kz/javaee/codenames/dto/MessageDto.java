package kz.javaee.codenames.dto;

import kz.javaee.codenames.utils.Turn;
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

    private List<Long> reds;

    private List<Long> blues;

    private List<CardDto> board;

    private Turn turn;

    private Long redsCap;

    private Long bluesCap;

    private boolean gameStarted;
}
