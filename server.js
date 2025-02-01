const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve the chat UI
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle Socket.IO connections
io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("chat message", (msgData) => {
        io.emit("chat message", msgData); // Broadcast message to all Clients
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

// Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
