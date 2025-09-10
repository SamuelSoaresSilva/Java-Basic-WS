package com.spring.websocket.chat;

public class ChatMessage {

    private String content;
    private String sender;
    private MessageType type;

    public void setContent(String content) {
        this.content = content;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public void setType(MessageType type) {
        this.type = type;
    }

    public MessageType getType() {
        return type;
    }

    public String getSender() {
        return sender;
    }

    public String getContent() {
        return content;
    }

    public ChatMessage(){}

    public ChatMessage( MessageType type, String sender){

        this.type = type;
        this.sender = sender;

    }

    public ChatMessage(String content, String sender, MessageType type){

        this.content = content;
        this.sender = sender;
        this.type = type;

    }
}
