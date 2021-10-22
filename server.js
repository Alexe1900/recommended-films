const ws = new require("ws");
const wss = new ws.Server({ noServer: true });

const clients = new Set();
const clientsData = new Set();

http.createServer((req, res) => {
  // в реальном проекте здесь может также быть код для обработки отличных от websoсket-запросов
  // здесь мы работаем с каждым запросом как с веб-сокетом
  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
});

function onSocketConnect(ws) {
  clients.add(ws);

  ws.on("message", function (message) {
    const messageData = JSON.parse(message);

    if (messageData.type == "CLIENTDATA") {
      clientsData.add({
        client: messageData.client,
        data: messageData.data,
      });
    }
  });

  ws.on("close", function () {
    clients.delete(ws);
  });
}
