const { Server } = require("socket.io");

const server = new Server({
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
  },
});

// Lista de usuários por sala
const roomsUsers = new Map();

function updateUsersList(room) {
  const users = roomsUsers.get(room) || [];
  server.to(room).emit("usersList", users);
}

server.on("connection", (socket) => {
socket.on('joinRoom', ({ username, room }) => {
  socket.join(room);
  socket.data.username = username;
  socket.data.room = room;

  if (!roomsUsers.has(room)) roomsUsers.set(room, []);

  const users = roomsUsers.get(room);

  const existingUser = users.find(u => u.username === username);

  if (existingUser) {
    // ✅ Reativa o usuário existente
    existingUser.online = true;
  } else {
    // ✅ Adiciona só se realmente não existir
    users.push({ username, online: true });
  }

  updateUsersList(room);

  console.log(`👤 ${username} entrou na sala: ${room}`);

  socket.broadcast.to(room).emit('received', {
    username: "Sistema",
    message: `${username} entrou na sala`
  });
});


  socket.on("message", (message) => {
    const username = socket.data.username || "Anon";
    const room = socket.data.room;
    if (!room) return;
    server.to(room).emit("received", { username, message });
  });

 socket.on('disconnect', () => {
  const username = socket.data.username;
  const room = socket.data.room;

  if (!username || !room) return;

  const users = roomsUsers.get(room) || [];
  const user = users.find(u => u.username === username);

  if (user) {
    user.online = false;
    updateUsersList(room);
  }

  console.log(`❌ ${username} saiu da sala`);
    socket.broadcast.to(room).emit('received', {
    username: "Sistema",
    message: `${username} saiu da sala`
  });
});

});

server.listen(4000, () =>
  console.log("🚀 Servidor Socket.IO rodando na porta 4000")
);
