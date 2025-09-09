package com.spring.websocket.configuration;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class WebSocketEventListenner {
    //nao e chatGPT, usei essa abordagem porque nao gosto de usar lombok!
    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(WebSocketEventListenner.class);

    @EventListener
    public void handlerWebSocketDisconnectListenner(
            SessionDisconnectEvent disconnectEvent
            ){
        //TODO
    }
}

