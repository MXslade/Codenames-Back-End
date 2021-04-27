package kz.javaee.codenames.services;

public interface SessionService {

    int getNumberOfAllSessions();

    int getNumberOfAllSessionsOfGameRoom(long gameRoomId);

}
