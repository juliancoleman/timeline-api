const util = require("util");

const ignoredBookshelfMessages = ["EmptyResponse", "No Rows Updated", "No Rows Deleted"];

const getBaseError = (defaultMessage, code) =>
  function (message = "") {
    const isIgnoredMessage = ignoredBookshelfMessages.includes(message);

    this.message = defaultMessage;

    if (message && !isIgnoredMessage) {
      this.message = message;
    }

    this.code = code;
  };

module.exports = (errorName, defaultMessage, code) => {
  const error = getBaseError(defaultMessage, code);

  util.inherits(error, Error);
  error.prototype.name = errorName;

  return error;
};
