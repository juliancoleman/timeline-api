const createError = appRequire("helpers/create_error");

module.exports = createError(
    "CampAlreadyAddedError",
    "Already added to camp",
    409 // eslint-disable-line
);
