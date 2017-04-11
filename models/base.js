const R = require("ramda");
const string = require("underscore.string");

const Bookshelf = appRequire("config/bookshelf");

// https://github.com/ramda/ramda/wiki/Cookbook#map-keys-of-an-object
const mapKeys = R.curry((fn, obj) =>
  R.fromPairs(R.map(R.adjust(fn, 0), R.toPairs(obj))));

module.exports = Bookshelf.Model.extend({
  hasTimestamps: true,
  softDelete: true,
  initialize(...args) {
    if (this.customError) {
      this.constructor.NotFoundError = this.customError;
      this.constructor.NoRowsUpdatedError = this.customError;
      this.constructor.NoRowsDeletedError = this.customError;
    }

    return Bookshelf.Model.prototype.initialize.apply(this, args);
  },

  // convert snake_case to camelCase
  parse: attrs => mapKeys(string.camelize, attrs),

  // convert camelCase to snake_case
  format: attrs => mapKeys(string.underscored, attrs),
  fetch(options) {
    const defaultOptions = { require: true };
    return Bookshelf.Model.prototype.fetch.call(this, R.merge(defaultOptions, options));
  },

  destroy(options) {
    const defaultOptions = { require: true };
    return Bookshelf.Model.prototype.destroy.call(this, R.merge(defaultOptions, options));
  },
});
