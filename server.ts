import * as Promise from "bluebird";
import * as Hapi from "hapi";
Promise.promisifyAll(Hapi);
const unhandledRejection = require("unhandled-rejection");

require("require-all")({
  dirname: `${__dirname}/models/`,
  recursive: true,
});

import { validateToken, algorithm } from "./lib/authentication/service";

const server = new Hapi.Server({ debug: false });
server.connection({ port: 7000, routes: { cors: true } });

import * as routes from "./routes";

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

module.exports = (server as any).registerAsync([
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

  rejectionEmitter.on("unhandledRejection", (error: Error) => {
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
