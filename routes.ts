import * as R from "ramda";
import * as traverse from "traverse";

interface Route {
  method: string;
  path: string;
  handler: Function;
  config?: {
    validate: Object[];
  };
};

const transformRoutes = (routes: any): Route[] =>
  traverse(routes)
    .reduce((acc: Object[], x: number) => {
      if (R.prop("method", x || {})) {
        acc.push(x);
      }

      return acc;
    }, []);

const routes = require("require-all")({
  dirname: `${__dirname}/controllers/`,
  recursive: true,
});

module.exports = transformRoutes(routes);
