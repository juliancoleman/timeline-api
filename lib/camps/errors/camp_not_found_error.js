const createError = appRequire("helpers/create_error");

module.exports = createError(
    "CampNotFoundError",
    "Camp not found",
    404 // eslint-disable-line
);
