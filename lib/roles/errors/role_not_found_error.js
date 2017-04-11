const createError = appRequire("helpers/create_error");

module.exports = createError(
    "RoleNotFoundError",
    "Role not found",
    404 // eslint-disable-line
);
