'use strict'

const add = (a, b) => a + b;
const avg = (arr) => arr.reduce(add, 0) / arr.length;

const axios = require("axios").default;

const websocket = new require("ws");
const PORT = process.env.PORT || 80;
console.log("port: ", PORT);
const wss = new websocket.Server({ port: PORT });

const ratings = {};

const api = {
  key: 'c33616c4ada296c918a35b2d9dbc7fb3',
  url: 'https://api.themoviedb.org/3/discover/movie',
  genreCodes: {
    comedy: 35,
    'sci-fi': 878,
    entertainment: '16,10751',
    adventure: 12,
    drama: 18,
  }
}

let getEndpoint = (genre) => `${api.url}?api_key=${api.key}&with_genres=${api.codes[genre]}`;

async function requestForFilms(genre) {
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
        if (messageData.data.entertainment > 2) {
          films.entertainment = await requestForFilms("entertainment");
        }
      })
      .then(async () => {
        if (messageData.data.adventure > 2) {
          films.adventure = await requestForFilms("adventure");
        }
      })
      .then(async () => {
        if (messageData.data.drama > 2) {
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
    }
  },
};

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const messageData = JSON.parse(message);

    commands[messageData.type](ws, messageData)
  });
});
