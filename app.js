const express = require("express");
const app = express();
const morgan = require("morgan");

const photosRoutes = require("./api/routes/photos");

app.use(morgan("dev"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/search/photos", photosRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Homepage</h1>");
});

app.use((req, res, next) => {
  next({ message: "Not found", status: 404 });
});

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message || "Internal Server Error",
    },
  });
});

app.listen(process.env.PORT || 8080);
