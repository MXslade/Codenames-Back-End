package kz.javaee.codenames.services.impl;

import kz.javaee.codenames.services.SessionService;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Service
public class SessionServiceImpl implements SessionService {

    @EventListener
    public void onSessionConnectedEvent(SessionConnectedEvent event) {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(event.getMessage());

        System.out.println(sha.getSessionId() + " " + sha.getSubscriptionId() + " " + sha.getDestination());
        System.out.println("Session connection happened kekw");
    }

    @EventListener
    public void onSessionDisconnectEvent(SessionDisconnectEvent event) {
        System.out.println("Session disconnection happened kekw");
    }

    @Override
    public int getNumberOfAllSessions() {
        return 0;
    }

    @Override
    public int getNumberOfAllSessionsOfGameRoom(long gameRoomId) {
        return 0;
    }
}
