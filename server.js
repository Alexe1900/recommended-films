const axios = require("axios").default;

const websocket = new require("ws");
const wss = new websocket.Server({ port: 1000 });

wss.on("connection", (ws) => {
  ws.on("message", function (message) {
    const messageData = JSON.parse(message);

    if (messageData.type == "CLIENTDATA") {
      let films = {};

      const requests = new Promise(async (resolve) => {
        if (messageData.data.comedy > 2) {
          await axios
            .get(
              "https://api.themoviedb.org/3/discover/movie?api_key=c33616c4ada296c918a35b2d9dbc7fb3&with_genres=35",
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((response) => response.data.results)
            .then((data) => {
              films.comedy = data.map((film) => {
                return {
                  img: `https://www.themoviedb.org/t/p/w220_and_h330_face${film.poster_path}`,
                  title: film.title,
                  description: film.overview,
                };
              });
              console.log({ films });
            });
        }

        resolve();
      })
        .then(async () => {
          if (messageData.data["sci-fi"] > 2) {
            await axios
              .get(
                "https://api.themoviedb.org/3/discover/movie?api_key=c33616c4ada296c918a35b2d9dbc7fb3&with_genres=878",
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((response) => response.data.results)
              .then((data) => {
                films["sci-fi"] = data.map((film) => {
                  return {
                    img: `https://www.themoviedb.org/t/p/w220_and_h330_face${film.poster_path}`,
                    title: film.title,
                    description: film.overview,
                  };
                });
                console.log({ films });
              });
          }
        })
        .then(async () => {
          if (messageData.data.entertainment > 2) {
            await axios
              .get(
                "https://api.themoviedb.org/3/discover/movie?api_key=c33616c4ada296c918a35b2d9dbc7fb3&with_genres=16,10751",
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((response) => response.data.results)
              .then((data) => {
                films.entertainment = data.map((film) => {
                  return {
                    img: `https://www.themoviedb.org/t/p/w220_and_h330_face${film.poster_path}`,
                    title: film.title,
                    description: film.overview,
                  };
                });
                console.log({ films });
              });
          }
        })
        .then(async () => {
          if (messageData.data.adventure > 2) {
            await axios
              .get(
                "https://api.themoviedb.org/3/discover/movie?api_key=c33616c4ada296c918a35b2d9dbc7fb3&with_genres=12",
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((response) => response.data.results)
              .then((data) => {
                films.adventure = data.map((film) => {
                  return {
                    img: `https://www.themoviedb.org/t/p/w220_and_h330_face${film.poster_path}`,
                    title: film.title,
                    description: film.overview,
                  };
                });
                console.log({ films });
              });
          }
        })
        .then(async () => {
          if (messageData.data.drama > 2) {
            await axios
              .get(
                "https://api.themoviedb.org/3/discover/movie?api_key=c33616c4ada296c918a35b2d9dbc7fb3&with_genres=18",
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((response) => response.data.results)
              .then((data) => {
                films.drama = data.map((film) => {
                  return {
                    img: `https://www.themoviedb.org/t/p/w220_and_h330_face${film.poster_path}`,
                    title: film.title,
                    description: film.overview,
                  };
                });
                console.log({ films });
              });
          }
        })
        .then(() => {
          console.log("stringify ", JSON.stringify(films));
          ws.send(JSON.stringify(films));
        });
    } else {
      ws.send("other request");
      console.log("other request");
    }
  });
});
