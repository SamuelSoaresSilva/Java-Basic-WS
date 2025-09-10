package com.spring.websocket.configuration;

import com.spring.websocket.chat.ChatMessage;
import com.spring.websocket.chat.MessageType;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class WebSocketEventListenner {

    private final SimpMessageSendingOperations messageTemplate;

    public WebSocketEventListenner(SimpMessageSendingOperations messageTemplate){
        this.messageTemplate = messageTemplate;
    }
    //nao e chatGPT, usei essa abordagem porque nao gosto de usar lombok!
    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(WebSocketEventListenner.class);

    @EventListener
    public void handlerWebSocketDisconnectListenner(
            SessionDisconnectEvent disconnectEvent
            ){

        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(disconnectEvent.getMessage());
        String username = (String) headerAccessor.getSessionAttributes().get("username");
        if (username != null){
            log.info("User disconnected {}", username);
            ChatMessage message = new ChatMessage(MessageType.LEAVE, username);
            messageTemplate.convertAndSend("/topic/public", message);
        }
    }
}

