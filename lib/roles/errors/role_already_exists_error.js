const createError = appRequire("helpers/create_error");

module.exports = createError(
    "RoleAlreadyExistsError",
    "Role already exists",
    409 // eslint-disable-line
);
