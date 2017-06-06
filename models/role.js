const BaseModel = require("./base");

const Bookshelf = appRequire("config/bookshelf");
const RoleNotFoundError = appRequire("lib/roles/errors/role_not_found_error");

const role = BaseModel.extend({
  tableName: "role",
  customError: RoleNotFoundError,
  user() {
    return this.belongsTo("User");
  },
  camps() {
    return this.belongsToMany("Camp", "role_camp");
  },
});

module.exports = Bookshelf.model("Role", role);
