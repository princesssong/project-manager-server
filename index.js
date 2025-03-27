const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());

io.on('connection', (socket) => {
  console.log(`🔌 New user connected: ${socket.id}`);

  // 클라이언트에서 보낸 메시지 수신
  socket.on('chat message', ({ user, msg }) => {
    // 모든 클라이언트에게 메시지 전송
    io.emit('chat message', { user, msg });
  });

  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

// ✅ Railway 등 호스팅 플랫폼용 포트 설정
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
