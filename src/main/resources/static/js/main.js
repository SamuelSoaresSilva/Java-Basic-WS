'use strict';

let stompClient = null;
let username = null;

function connect(event) {
    username = document.querySelector('#username').value.trim();
    
    if (username) {
        document.querySelector('#login-page').classList.add('d-none');
        document.querySelector('#chat-page').classList.remove('d-none');
        
        const socket = new SockJS('/web-socket');
        stompClient = Stomp.over(socket);
        
        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault();
}

function onConnected() {
    // Inscrever-se no tópico público
    stompClient.subscribe('/topic/public', onMessageReceived);
    
    // Enviar mensagem de entrada para o servidor
    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({sender: username, type: 'JOIN'})
    );
    
    addSystemMessage(`${username}, bem-vindo ao chat!`);
}

function onError(error) {
    addSystemMessage('Não foi possível conectar ao WebSocket! Atualize a página e tente novamente.');
    console.error('Erro na conexão WebSocket:', error);
}

function disconnect() {
    if (stompClient) {
        // Não precisamos enviar mensagem LEAVE manualmente, pois o WebSocketEventListener já faz isso
        // quando detecta a desconexão do WebSocket
        
        // Desconectar do WebSocket
        stompClient.disconnect();
        stompClient = null;
        
        // Voltar para a tela de login
        document.querySelector('#chat-page').classList.add('d-none');
        document.querySelector('#login-page').classList.remove('d-none');
        
        // Limpar as mensagens do chat
        document.querySelector('#chat-messages').innerHTML = '';
        
        // Limpar o campo de usuário
        document.querySelector('#username').value = '';
        username = null;
    }
}

function sendMessage(event) {
    const messageInput = document.querySelector('#message');
    const messageContent = messageInput.value.trim();
    
    if (messageContent && stompClient) {
        const chatMessage = {
            sender: username,
            content: messageContent,
            type: 'CHAT'
        };
        
        stompClient.send("/app/chat.send", {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
    event.preventDefault();
}

function onMessageReceived(payload) {
    const message = JSON.parse(payload.body);
    
    switch(message.type) {
        case 'JOIN':
            addSystemMessage(`${message.sender} entrou no chat!`);
            break;
        case 'LEAVE':
            addSystemMessage(`${message.sender} saiu do chat!`);
            break;
        case 'CHAT':
            addChatMessage(message);
            break;
        default:
            break;
    }
    
    // Rolar para a mensagem mais recente
    const chatMessages = document.querySelector('#chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addChatMessage(message) {
    const chatMessages = document.querySelector('#chat-messages');
    const messageElement = document.createElement('div');
    
    messageElement.classList.add('message');
    if (message.sender === username) {
        messageElement.classList.add('message-sent');
    } else {
        messageElement.classList.add('message-received');
    }
    
    const senderElement = document.createElement('div');
    senderElement.classList.add('message-sender');
    senderElement.textContent = message.sender;
    
    const contentElement = document.createElement('p');
    contentElement.classList.add('message-content');
    contentElement.textContent = message.content;
    
    const timeElement = document.createElement('div');
    timeElement.classList.add('message-time');
    timeElement.textContent = new Date().toLocaleTimeString();
    
    messageElement.appendChild(senderElement);
    messageElement.appendChild(contentElement);
    messageElement.appendChild(timeElement);
    
    chatMessages.appendChild(messageElement);
}

function addSystemMessage(message) {
    const chatMessages = document.querySelector('#chat-messages');
    const messageElement = document.createElement('div');
    
    messageElement.classList.add('system-message');
    messageElement.textContent = message;
    
    chatMessages.appendChild(messageElement);
}

// Event listeners
document.querySelector('#login-form').addEventListener('submit', connect);
document.querySelector('#message-form').addEventListener('submit', sendMessage);
document.querySelector('#disconnect-btn').addEventListener('click', disconnect);