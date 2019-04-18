const fs = require("fs");
const { readFile, produceResult } = require("./helpers");

class ReviewBuilder {
  buildReviewsSync() {
    const products = JSON.parse(
      fs.readFileSync("./data/products.json", "utf-8")
    );
    const reviews = JSON.parse(fs.readFileSync("./data/reviews.json", "utf-8"));
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    return produceResult({ products, reviews, users });
  }

  buildReviewsCallbacks(cb) {
    fs.readFile("./data/products.json", "utf8", (err, products) => {
      if (err) throw err;
      fs.readFile("./data/reviews.json", "utf8", (err, reviews) => {
        if (err) throw err;
        fs.readFile("./data/users.json", "utf8", (err, users) => {
          if (err) throw err;
          products = JSON.parse(products);
          reviews = JSON.parse(reviews);
          users = JSON.parse(users);
          cb(produceResult({ products, reviews, users }));
        });
      });
    });
  }

  buildReviewsPromises() {
    return Promise.all([
      readFile("./data/products.json", "utf8", (err, products) => {
        if (err) throw err;
      }),
      readFile("./data/reviews.json", "utf8", (err, reviews) => {
        if (err) throw err;
      }),
      readFile("./data/users.json", "utf8", (err, users) => {
        if (err) throw err;
      }),
    ]).then(([products, reviews, users]) => {
      products = JSON.parse(products);
      reviews = JSON.parse(reviews);
      users = JSON.parse(users);
      return produceResult({ products, reviews, users });
    });
  }

  async buildReviewsAsyncAwait() {
    const p = await readFile(
      "./data/products.json",
      "utf8",
      (err, products) => {
        if (err) throw err;
      }
    );
    const r = await readFile("./data/reviews.json", "utf8", (err, reviews) => {
      if (err) throw err;
    });
    const u = await readFile("./data/users.json", "utf8", (err, users) => {
      if (err) throw err;
    });
    const products = JSON.parse(p);
    const reviews = JSON.parse(r);
    const users = JSON.parse(u);
    return produceResult({ products, reviews, users });
  }
}

module.exports = ReviewBuilder;
