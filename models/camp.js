const R = require("ramda");

const BaseModel = appRequire("models/base");
const Bookshelf = appRequire("config/bookshelf");
const CampNotFoundError = appRequire("lib/camps/errors/camp_not_found_error");

const paginationCountDistinctQueryStatement = {
  grouping: "columns",
  type: "aggregate",
  method: "count",
  value: "camp.id",
  aggregateDistinct: true,
};

const camp = BaseModel.extend({
  tableName: "camp",
  customError: CampNotFoundError,
  virtuals: {
    groupMembers() {
      if (this.related("roles")) {
        return this.related("roles").map(role => role.related("user"));
      }

      return [];
    },
  },
  initialize(...args) {
    this.on("fetching fetching:collection", (model, columns, options) => {
      const isPaginationQuery = R.contains(
        paginationCountDistinctQueryStatement,
        R.path(["query", "_statements"], options) // eslint-disable-line
      );

      if (!isPaginationQuery) {
        options.query.select(
          "*",
          Bookshelf.knex("role_camp").count("role_camp.camp_id")
          .innerJoin("role", "role_camp.role_id", "role.id")
          .whereRaw("role_camp.camp_id = camp.id")
          .where({
            "role_camp.deleted_at": null,
            "role.deleted_at": null,
            "role.name": "Student",
          })
          .as("enrollment") // eslint-disable-line
        );
      }
    });
    return BaseModel.prototype.initialize.apply(this, args);
  },
  roles() {
    return this.belongsToMany("Role", "role_camp")
      .where("role_camp.deleted_at", "=", null);
  },
  leader() {
    return this.roles().query((qb) => {
      qb.where({
        "role.name": "Leader",
        "role_camp.deleted_at": null,
        "role.deleted_at": null,
      });
    });
  },
  itineraries() {
    return this.hasMany("Itinerary");
  },
});

module.exports = Bookshelf.model("Camp", camp);
