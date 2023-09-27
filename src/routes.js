const todoRoutes = require("./api/book");
const userRoutes = require("./api/user");
const authLocalRouter = require("./auth/local");
const categoryRouter = require("./api/category");

const routes = (app) => {
  app.use("/api/books", todoRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/category", categoryRouter);
  app.use("/auth/local", authLocalRouter);
};

module.exports = routes;
