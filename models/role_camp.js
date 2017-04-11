const BaseModel = appRequire("models/base");
const Bookshelf = appRequire("config/bookshelf");
const RoleCampNotFoundError = appRequire("lib/roles/errors/role_camp_not_found_error");

const roleCamp = BaseModel.extend({
  tableName: "role_camp",
  customError: RoleCampNotFoundError,
});

module.exports = Bookshelf.model("RoleCamp", roleCamp);
