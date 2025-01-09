const express = require('express');
const WebSocket = require('ws');
const path = require('path');

// 创建Express服务器
const app = express();
app.use(express.static('public'));

// 创建WebSocket服务器
const wss = new WebSocket.Server({ port: 3000 });

// 在线用户列表
const onlineUsers = new Set();

console.log('WebSocket server is running on ws://localhost:3000');

// 管理界面路由
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/admin.html'));
});

// 获取在线用户数API
app.get('/api/online-users', (req, res) => {
  res.json({ count: onlineUsers.size });
});

// 群发消息API
app.post('/api/broadcast', express.json(), (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(`Admin: ${message}`);
    }
  });

  res.json({ success: true });
});

// 启动Express服务器
app.listen(3001, () => {
  console.log('Admin server is running on http://localhost:3001');
});

// 处理连接事件
wss.on('connection', (ws) => {
  console.log('New client connected');
  onlineUsers.add(ws);

  // 处理消息事件
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    
    // 广播消息给所有客户端
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Server: ${message}`);
      }
    });
  });

  // 处理关闭事件
  ws.on('close', () => {
    console.log('Client disconnected');
    onlineUsers.delete(ws);
  });
});
