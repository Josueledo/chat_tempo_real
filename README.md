# 📩 Real-Time Chat --- Angular + Node.js + Socket.io
# Integrantes:
-Luiza Peinado
-Lucas Lima
-Josué ledo

Este projeto implementa um **sistema de chat em tempo real** utilizando
**Socket.io**, com backend em **Node.js** e frontend em **Angular**.\
A aplicação permite troca instantânea de mensagens, gerenciamento de
salas e visualização em tempo real dos usuários conectados.

------------------------------------------------------------------------

## 🚀 Tecnologias Utilizadas

### **Backend**

-   Node.js
-   Socket.io
-   Cors

### **Frontend**

-   Angular 18+
-   Socket.io Client

------------------------------------------------------------------------

## 📌 Funcionalidades

### **Backend**

-   Criação de servidor WebSocket
-   Comunicação bidirecional em tempo real
-   Gerenciamento de salas e usuários
-   Emissão de mensagens e eventos
-   Atualização automática da lista de usuários conectados

### **Frontend**

-   Interface amigável e responsiva
-   Envio e recebimento de mensagens instantâneas
-   Exibição da lista de usuários por sala
-   Notificações de entrada e saída
-   Comunicação direta com o WebSocket do backend

------------------------------------------------------------------------

## 📁 Estrutura do Projeto

### **Backend**

    backend/
     ├─ src/
     │   ├─ server.js
     │   └─ rooms.js
     ├─ package.json

### **Frontend**

    frontend/
      frontchat
     ├─ src/
     │   ├─ app/
     │   │   ├─ chat/
     │   │   ├─ services/
     │   │   └─ models/
     ├─ angular.json
     ├─ package.json

------------------------------------------------------------------------

## ⚙️ Instalação e Execução

### 🔧 Backend (Node.js + Socket.io)

#### Instalar dependências:

``` bash
cd backend
npm install
```

#### Iniciar servidor:

``` bash
npm start
```

Backend disponível em: **http://localhost:3000**

------------------------------------------------------------------------

### 💻 Frontend (Angular)

#### Instalar dependências:

``` bash
cd frontend
cd frontchat
npm install
```

#### Rodar aplicação:

``` bash
ng serve
```

Frontend disponível em: **http://localhost:4200**

------------------------------------------------------------------------

## 🔌 Comunicação via Socket.io

### Eventos do servidor

  Evento         Função
  -------------- --------------------------------------
  `joinRoom`     Usuário entra em uma sala
  `message`      Emite mensagens para os usuários
  `usersList`    Atualiza a lista de usuários da sala
  `disconnect`   Detecta saída do usuário

### Eventos usados no cliente

  Evento             Função
  ------------------ ----------------------------
  `sendMessage`      Envia mensagem ao servidor
  `receiveMessage`   Recebe mensagens da sala
  `updateUsers`      Atualiza lista de usuários

------------------------------------------------------------------------

