# Aplicação de Chat com WebSocket

Esta é uma aplicação de chat em tempo real desenvolvida com Spring Boot e WebSocket. A aplicação permite que múltiplos usuários se conectem, enviem mensagens e vejam notificações de entrada e saída de outros usuários.

## Funcionalidades

- **Login de usuário**: Interface simples para entrada no chat com nome de usuário
- **Mensagens em tempo real**: Comunicação instantânea entre todos os usuários conectados
- **Notificações de entrada/saída**: Avisos automáticos quando usuários entram ou saem do chat
- **Interface responsiva**: Design adaptável para diferentes tamanhos de tela usando Bootstrap
- **Botão de desconexão**: Permite que o usuário saia do chat e retorne à tela de login

## Requisitos

- Java 21
- Maven 3.6+
- Navegador web moderno com suporte a WebSocket

## Tecnologias Utilizadas

- **Spring Boot 3.5.5**: Framework para desenvolvimento da aplicação Java
- **Spring WebSocket**: Implementação do protocolo WebSocket para comunicação em tempo real
- **SockJS**: Biblioteca para garantir compatibilidade com navegadores que não suportam WebSocket nativo
- **STOMP**: Protocolo de mensagens para comunicação cliente-servidor
- **Bootstrap 5.3**: Framework CSS para design responsivo

## Estrutura do Projeto

```
src/main/java/com/spring/websocket/
├── WebsocketApplication.java           # Classe principal da aplicação Spring Boot
├── chat/                               # Pacote com classes relacionadas ao chat
│   ├── ChatController.java             # Controlador para gerenciar mensagens
│   ├── ChatMessage.java                # Modelo de dados para mensagens
│   └── MessageType.java                # Enum com tipos de mensagens (CHAT, JOIN, LEAVE)
├── configuration/                      # Pacote com configurações
│   ├── WebSocketConfig.java            # Configuração do WebSocket
│   └── WebSocketEventListenner.java    # Listener para eventos de WebSocket (conexão/desconexão)
└── handler/                            # Pacote com handlers
    └── Handler.java                    # Handler para WebSocket

src/main/resources/
├── static/                             # Recursos estáticos
│   ├── css/                            # Estilos CSS
│   │   └── main.css                    # Estilos da aplicação
│   ├── js/                             # JavaScript
│   │   └── main.js                     # Lógica do cliente
│   └── index.html                      # Página HTML principal
└── application.properties              # Configurações da aplicação
```

## Instalação e Execução

1. Clone o repositório:
   ```bash
   git clone [URL_DO_REPOSITÓRIO]
   cd Java-Basic-WS
   ```

2. Compile e execute a aplicação com Maven:
   ```bash
   mvn spring-boot:run
   ```

3. Acesse a aplicação no navegador:
   ```
   http://localhost:8080
   ```

## Como Usar

1. Na tela inicial, digite seu nome de usuário e clique em "Entrar"
2. Você será redirecionado para a sala de chat
3. Digite suas mensagens no campo de texto e clique em "Enviar"
4. Você verá suas mensagens e as mensagens de outros usuários em tempo real
5. Quando um usuário entra ou sai do chat, uma notificação é exibida para todos
6. Para sair do chat, clique no botão "Desconectar"

## Detalhes de Implementação

### Backend

- **WebSocketConfig**: Configura o endpoint WebSocket `/web-socket` e define os prefixos de destino para mensagens
- **ChatController**: Gerencia as mensagens enviadas pelos usuários e adiciona novos usuários ao chat
- **WebSocketEventListenner**: Detecta quando um usuário se desconecta e notifica os outros usuários
- **ChatMessage**: Modelo que representa uma mensagem com sender, content e type

### Frontend

- **main.js**: Implementa a lógica do cliente para conexão WebSocket, envio e recebimento de mensagens
- **main.css**: Define os estilos para as mensagens e interface do chat
- **index.html**: Estrutura HTML com formulário de login e interface do chat

## Fluxo de Comunicação

1. Cliente se conecta ao endpoint `/web-socket` usando SockJS e STOMP
2. Cliente se inscreve no tópico `/topic/public` para receber mensagens
3. Ao entrar, cliente envia mensagem JOIN para `/app/chat.addUser`
4. Ao enviar mensagem, cliente envia para `/app/chat.send`
5. Servidor encaminha mensagens para todos os clientes inscritos em `/topic/public`
6. Ao desconectar, o servidor detecta e envia mensagem LEAVE para todos os clientes

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests com melhorias.