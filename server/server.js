const express = require("express");
const http = require("http");
const ngrok = require("ngrok");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "https://0ec8-213-230-86-14.ngrok-free.app",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    socket.emit("me", socket.id);

    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded");
    });

    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name });
    });

    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal);
    });
});

// Use ngrok to expose the server to the internet
(async () => {
    const url = await ngrok.connect({
        addr: 8080, // the port your server is running on
        region: "us", // Change to your preferred ngrok region
    });
    console.log(`Ngrok URL: ${url}`);
})();

server.listen(8080, () => console.log("Server is running on port 8080"));
