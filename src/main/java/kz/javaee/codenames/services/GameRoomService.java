package kz.javaee.codenames.services;

import kz.javaee.codenames.models.GameRoom;

import java.util.List;

public interface GameRoomService {

    GameRoom getGameRoomById(Long id);

    List<GameRoom> getAllGameRooms();

    GameRoom createGameRoom(GameRoom gameRoom);

    GameRoom updateGameRoom(GameRoom gameRoom);

    GameRoom deleteGameRoom(GameRoom gameRoom);

    String generateConfigForGameRoom(Long gameRoomId);

}
