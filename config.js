module.exports = {
  port: process.env.PORT || 80,
  api: {
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
};