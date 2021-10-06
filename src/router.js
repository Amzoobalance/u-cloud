const { METHODS } = require("http");

const Router = (routes = {}) => ({
  all: (handler) => Router(routes).every(handler, METHODS),
  get: (handler) => Router(routes).every(handler, ["GET"]),
  post: (handler) => Router(routes).every(handler, ["POST"]),
  put: (handler) => Router(routes).every(handler, ["PUT"]),
  patch: (handler) => Router(routes).every(handler, ["PATCH"]),
  delete: (handler) => Router(routes).every(handler, ["DELETE"]),
  head: (handler) => Router(routes).every(handler, ["HEAD"]),
  options: (handler) => Router(routes).every(handler, ["OPTIONS"]),
  every: (handler, methods) => {
    for (const method of methods) {
      routes[method] = handler;
    }
    return Router(routes);
  },
  serve: (req, res) => {
    try {
      routes[req.method](req, res);
    } catch (e) {
      console.error(e.message);
    }
  },
});

module.exports = {
  Router,
};
