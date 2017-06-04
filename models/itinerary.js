const BaseModel = require("./base");

const Bookshelf = appRequire("config/bookshelf");
const ItineraryNotFoundError = appRequire("lib/itineraries/errors/itinerary_not_found_error");

const itinerary = BaseModel.extend({
  tableName: "itinerary",
  customError: ItineraryNotFoundError,
  accessibleCampusLeaderItineraries(user) {
    const accessibleItineraryIds = Bookshelf.knex
      .select("itinerary.id")
      .from("itinerary")
      .innerJoin("camp", "itinerary.camp_id", "camp.id")
      .innerJoin("role_camp", "camp.id", "role_camp.camp_id")
      .innerJoin("role", "role_camp.role_id", "role.id")
      .innerJoin("user", "role.user_id", "user.id")
      .where({
        "user.id": user.get("id"),
        "role.name": "Campus Leader",
        "role.deleted_at": null,
        "role_camp.deleted_at": null,
        "camp.deleted_at": null,
        "itinerary.deleted_at": null,
      });

    return this.query(qb => qb.whereIn("id", accessibleItineraryIds));
  },
  camp() {
    return this.belongsTo("Camp");
  },
  checkin() {
    return this.hasMany("Checkin");
  },
});

module.exports = Bookshelf.model("Itinerary", itinerary);
