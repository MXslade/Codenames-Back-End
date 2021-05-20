package kz.javaee.codenames.services.impl;

import kz.javaee.codenames.dto.CardDto;
import kz.javaee.codenames.dto.MessageDto;
import kz.javaee.codenames.models.GameRoom;
import kz.javaee.codenames.models.Word;
import kz.javaee.codenames.repositories.GameRoomRepository;
import kz.javaee.codenames.repositories.WordRepository;
import kz.javaee.codenames.services.DtoTransformService;
import kz.javaee.codenames.services.GameRoomService;
import kz.javaee.codenames.utils.Turn;
import kz.javaee.codenames.utils.Underneath;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class GameRoomServiceImpl implements GameRoomService {

    @Autowired
    private GameRoomRepository gameRoomRepository;
    @Autowired
    private WordRepository wordRepository;
    @Autowired
    private DtoTransformService dtoTransformService;

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

    @Override
    public String generateConfigForGameRoom(Long gameRoomId) {
        // first of all I need to take randomly 25 words from all words that we have from db
        List<Word> allWords = wordRepository.findAll();
        List<Word> chosenWords = new ArrayList<>();
        Set<Long> chosenWordsIds = new HashSet<>();
        Random random = new Random();
        int wordsNum = allWords.size();

        while (chosenWords.size() < 25) { // hopefully this doesn't get stuck for forever while generating one random number again and again
            int index = Math.abs(random.nextInt() % wordsNum);
            long id = allWords.get(index).getId();
            if (!chosenWordsIds.contains(id)) {
                chosenWords.add(allWords.get(index));
                chosenWordsIds.add(id);
            }
        }

        List<CardDto> board = new ArrayList<>();
        for (int i = 0; i < chosenWords.size(); ++i) {
            board.add(new CardDto(i / 5, i % 5, chosenWords.get(i).getText(), false, null));
        }

        // now I need to decide which team gonna have first turn, which means would have 9 ogents
        // second teams gonna have 8 agents
        // 0 - red, 1 - blue
        int team = Math.abs(random.nextInt() % 2);
        Turn turn;
        int red;
        int blue;
        if (team == 0) {
            red = 9;
            blue = 8;
            turn = Turn.REDS;
        } else {
            red = 8;
            blue = 9;
            turn = Turn.BLUES;
        }

        // after deciding which team has which turn
        // we gonna assign each operative some place on a board


        Set<Integer> usedIndexes = new HashSet<>();
        // assigning red agents
        while (red > 0) {
            int index = Math.abs(random.nextInt() % 25);
            if (!usedIndexes.contains(index)) {
                usedIndexes.add(index);
                board.get(index).setUnderneath(Underneath.RED_AGENT);
                --red;
            }
        }
        // assigning blue agents
        while (blue > 0) {
            int index = Math.abs(random.nextInt() % 25);
            if (!usedIndexes.contains(index)) {
                usedIndexes.add(index);
                board.get(index).setUnderneath(Underneath.BLUE_AGENT);
                --blue;
            }
        }
        // assigning ordinary people
        int ordinary = 7;
        for (int i = 0; i < 25; ++i) {
            if (ordinary > 0) {
                if (!usedIndexes.contains(i)) {
                    ordinary--;
                    usedIndexes.add(i);
                    board.get(i).setUnderneath(Underneath.ORDINARY);
                }
            } else {
                break;
            }
        }
        // assigning assassin
        for (int i = 0; i < 25; ++i) {
            if (!usedIndexes.contains(i)) {
                usedIndexes.add(i);
                board.get(i).setUnderneath(Underneath.KILLER);
                break;
            }
        }

        MessageDto messageDto = new MessageDto(gameRoomId.toString(), new ArrayList<>(), new ArrayList<>(), board, turn, null, null, false);

        return dtoTransformService.fromMessageDtoToString(messageDto);
    }
}
