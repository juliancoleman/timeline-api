const createError = appRequire("helpers/create_error");

module.exports = createError(
  "UserAlreadyExistsError",
  "User already exists",
  409 // eslint-disable-line
);
