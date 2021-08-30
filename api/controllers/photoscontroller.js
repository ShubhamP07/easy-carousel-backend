const fetch = require("node-fetch");

exports.getPhotosByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const { qty } = req.query;

    const response = await fetch(
      `https://api.unsplash.com/search/photos?client_id=5F6xRIdUuQBX1556iGYD-5b-Fl8xP5wbiJk9IewNzTs&query=${category}&orientation=squarish&per_page=${
        qty || 5
      }`
    );

    const data = await response.json();

    const photos = data.results.map((searchResult) => ({
      url: searchResult.urls.regular,
      id: searchResult.id,
    }));

    return res.json({ photos });
  } catch (error) {
    console.dir(error);
    next(error);
  }
};
