'use strict'

const add = (a, b) => a + b;
const avg = (arr) => arr.reduce(add, 0) / arr.length;

const axios = require("axios").default;
const config = require("./config");

const websocket = new require("ws");
const PORT = config.port;
console.log("port: ", PORT);
const wss = new websocket.Server({ port: PORT });

const ratings = {};

const api = config.api;

const getEndpoint = (genre) => `${api.url}?api_key=${api.key}&with_genres=${api.codes[genre]}`;

const requestForFilms = async (genre) => {
  if (messageData.data[genre] > 2) {
    let response = await axios.get(
        getEndpoint(genre),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

    let data = response.data.results;

    return (
      data.map((film) => {
        const record = ratings[film.id];
        const result = record ? avg(record) : "No rating";

        return {
          img: `https://www.themoviedb.org/t/p/w220_and_h330_face${film.poster_path}`,
          title: film.title,
          description: film.overview,
          rating: result,
          id: film.id,
        };
      })
    )
  }
}

const commands = {
  CLIENTDATA: (ws, messageData) => {
    const films = {};
    const genresRatings = messageData.data;

    const requests = new Promise(async (resolve) => {
      if (genresRatings.comedy > 2) {
        films.comedy = await requestForFilms('comedy');
      }

      resolve();
    })
      .then(async () => {
        if (genresRatings["sci-fi"] > 2) {
          films["sci-fi"] = await requestForFilms("sci-fi");
        }
      })
      .then(async () => {
        if (genresRatings.entertainment > 2) {
          films.entertainment = await requestForFilms("entertainment");
        }
      })
      .then(async () => {
        if (genresRatings.adventure > 2) {
          films.adventure = await requestForFilms("adventure");
        }
      })
      .then(async () => {
        if (genresRatings.drama > 2) {
          films.drama = await requestForFilms("drama");
        }
      })
      .then(() => {
        ws.send(JSON.stringify(films));
      });
  },
  NEWRATING: (ws, messageData) => {
    const { id, newRating } = messageData.data;

    if (ratings[id]) ratings.push(newRating);
    else ratings[id] = [newRating];
  },
};

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const messageData = JSON.parse(message);

    commands[messageData.type](ws, messageData)
  });
});
