const websocket = new require("ws");
const wss = new websocket.Server({ port: 1000 });

const clientsData = new Set();

wss.on("connection", (ws) => {
  ws.on("message", function (message) {
    const messageData = JSON.parse(message);
    console.log(messageData);

    if (messageData.type == "CLIENTDATA") {
      clientsData.add({
        client: ws,
        data: messageData.data,
      });
      ws.send("films");
    } else {
      ws.send("other request");
      console.log("other request");
    }
  });
});
