const createError = appRequire("helpers/create_error");

module.exports = createError(
    "ItineraryNotFoundError",
    "Itinerary not found",
    404 // eslint-disable-line
);
