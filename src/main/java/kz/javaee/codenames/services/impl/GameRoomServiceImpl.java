package kz.javaee.codenames.services.impl;

import kz.javaee.codenames.models.GameRoom;
import kz.javaee.codenames.repositories.GameRoomRepository;
import kz.javaee.codenames.services.GameRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameRoomServiceImpl implements GameRoomService {

    @Autowired
    private GameRoomRepository gameRoomRepository;

    @Override
    public GameRoom getGameRoomById(Long id) {
        return gameRoomRepository.findById(id).orElse(null);
    }

    @Override
    public List<GameRoom> getAllGameRooms() {
        return gameRoomRepository.findAll();
    }

    @Override
    public GameRoom createGameRoom(GameRoom gameRoom) {
        return gameRoomRepository.save(gameRoom);
    }

    @Override
    public GameRoom updateGameRoom(GameRoom gameRoom) {
        return gameRoomRepository.save(gameRoom);
    }

    @Override
    public GameRoom deleteGameRoom(GameRoom gameRoom) {
        if (getGameRoomById(gameRoom.getId()) != null) {
            gameRoomRepository.delete(gameRoom);
            return gameRoom;
        }
        return null;
    }
}
