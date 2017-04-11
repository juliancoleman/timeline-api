const BaseModel = require("./base");

const Bookshelf = appRequire("config/bookshelf");
const ItineraryNotFoundError = appRequire("lib/itineraries/errors/itinerary_not_found_error");

const itinerary = BaseModel.extend({
  tableName: "itinerary",
  customError: ItineraryNotFoundError,
  camp() {
    return this.belongsTo("Camp");
  },
  checkin() {
    return this.hasMany("Checkin");
  },
});

module.exports = Bookshelf.model("Itinerary", itinerary);
