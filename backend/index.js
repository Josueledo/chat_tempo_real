const { Server } = require('socket.io');

const server = new Server({
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
});

server.on('connection', (socket) => {
  console.log('✅ Novo usuário conectado:', socket.id);

  // Evento para entrar em uma sala
  socket.on('joinRoom', ({ username, room }) => {
    socket.join(room);
    socket.data.username = username;
    socket.data.room = room;

    console.log(`👤 ${username} entrou na sala: ${room}`);

    // Mensagem para todos na sala, exceto quem entrou
    socket.broadcast.to(room).emit('received', {
      username: 'Sistema',
      message: `${username} entrou na sala`
    });

    // Mensagem para o próprio usuário que entrou
    socket.emit('received', {
      username: 'Sistema',
      message: `Você entrou na sala: ${room}`
    });
  });

  // Evento para envio de mensagens
  socket.on('message', (message) => {
    const username = socket.data.username || 'Anon';
    const room = socket.data.room;

    if (!room) return;

    console.log(`📩 ${username}: ${message}`);

    // Envia a mensagem para todos na sala, incluindo quem enviou
    server.to(room).emit('received', { username, message });
  });

  // Desconexão
  socket.on('disconnect', () => {
    const username = socket.data.username || 'Anon';
    const room = socket.data.room;

    if (room) {
      socket.broadcast.to(room).emit('received', {
        username: 'Sistema',
        message: `${username} saiu da sala`
      });
    }

    console.log(`❌ Usuário desconectado: ${socket.id}`);
  });
});

server.listen(4000, () =>
  console.log('🚀 Servidor Socket.IO rodando na porta 4000')
);
