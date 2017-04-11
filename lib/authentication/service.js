const Promise = require("bluebird");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = appRequire("models/user");
const InvalidEmailPasswordError = appRequire("lib/users/errors/invalid_email_password_error");

const algorithm = "HS256";
const expiresIn = "7d";

const signToken = user => jwt.sign(
  { accountId: user.get("id") },
  process.env.JWT_KEY,
  { algorithm, expiresIn } // eslint-disable-line
);

const refreshToken = Promise.coroutine(function* (token) {
  const decodedToken = yield jwt.verifyAsync(token, process.env.JWT_KEY);

  if (!decodedToken) { return null; }

  const user = yield User.forge({ id: decodedToken.accountId }).fetch();

  if (!user) { return null; }

  return signToken(user);
});

const validateToken = (request, decodedToken, callback) => {
  const error = undefined;
  const userId = decodedToken.accountId;

  User
    .forge({ id: userId })
    .fetch({ withRelated: "roles" })
    .then((user) => {
      if (!user) {
        return callback(error, false, user);
      }

      request.user = user; //eslint-disable-line

      return callback(error, true, user);
    })
    .catch((err) => {
      console.error(err.stack);
      callback(err, false, undefined);
    });
};

const validateCredentials = Promise.coroutine(function* (attributes) {
  const user = yield User.forge({ emailAddress: attributes.email_address }).fetch({ withRelated: "roles" });

  if (!user) {
    throw new InvalidEmailPasswordError();
  }

  return yield bcrypt.compareAsync(
    attributes.password,
    user.get("encryptedPassword") // eslint-disable-line
  )
  .then((isValid) => {
    if (!isValid) {
      throw new InvalidEmailPasswordError();
    }

    return user;
  });
});

module.exports = {
  algorithm,
  signToken,
  refreshToken,
  validateToken,
  validateCredentials,
};
