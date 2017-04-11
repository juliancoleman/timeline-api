const createError = appRequire("helpers/create_error");

module.exports = createError(
    "RoleCampNotFoundError",
    "Camp enrollment not found",
    404 // eslint-disable-line
);
