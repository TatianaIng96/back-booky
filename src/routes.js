const todoRoutes = require("./api/book");
const userRoutes = require("./api/user");
const authLocalRouter = require("./auth/local");

const routes = (app) => {
  app.use("/api/books", todoRoutes);
  app.use("/api/users", userRoutes);
  app.use("/auth/local", authLocalRouter);
};

module.exports = routes;
