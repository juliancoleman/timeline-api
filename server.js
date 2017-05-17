const Promise = require("bluebird");
const R = require("ramda");
// https://github.com/hapijs/hapi/issues/2394#issuecomment-73442383
const Hapi = Promise.promisifyAll(require("hapi"));
const unhandledRejection = require("unhandled-rejection");

require("require-all")({
  dirname: `${__dirname}/models/`,
  recursive: true,
});

const { validateToken, algorithm } = appRequire("lib/authentication/service");

const server = new Hapi.Server({ debug: false });
server.connection({ port: R.defaultTo(7000, process.env.PORT), routes: { cors: true } });

const routes = appRequire("routes");

const good = {
  register: require("good"),
  options: {
    ops: { interval: 1000 },
    reporters: {
      console: [
        {
          module: "good-squeeze",
          name: "Squeeze",
          args: [{ log: "*", response: "*" }],
        },
        {
          module: "good-console",
          args: [{ format: "MM/DD/YYYY HH:mm:ss A" }],
        },
        "stdout",
      ],
    },
  },
};

const mrhorse = {
  register: require("mrhorse"),
  options: {
    policyDirectory: `${__dirname}/policies`,
  },
};

module.exports = server.registerAsync([
  require("hapi-boom-decorators"),
  require("hapi-auth-jwt"),
  good,
  mrhorse,
]).then((err) => {
  const rejectionEmitter = unhandledRejection();

  if (err) {
    console.error("Unable to load plugin. Info below:");
    console.error(err);
  }

  rejectionEmitter.on("unhandledRejection", (error) => {
    console.error(error.toString());

    if (error.stack) {
      console.error(error.stack);
    }

    throw error;
  });

  server.auth.strategy("token", "jwt", {
    key: process.env.JWT_KEY,
    validateFunc: validateToken,
    verifyOptions: { algorithms: [algorithm] },
  });

  server.auth.default("token");
  server.route(routes);

  return server;
});
