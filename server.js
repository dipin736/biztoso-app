
const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });
const clients = [];

wss.on('connection', (ws) => {
  console.log('New client connected');
  clients.push(ws);
  ws.send(JSON.stringify({ type: 'welcome', message: 'Welcome! Ask me anything!' }));
  ws.on('message', (message) => {
    clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'message', message: message }));
      }
    });
  });

  // Handle connection close
  ws.on('close', () => {
    const index = clients.indexOf(ws);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});

console.log('WebSocket server running on ws://localhost:8080');
