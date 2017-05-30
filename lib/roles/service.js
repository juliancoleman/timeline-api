const Promise = require("bluebird");

const User = appRequire("models/user");
const Role = appRequire("models/role");
const RoleAlreadyExistsError = appRequire("lib/roles/errors/role_already_exists_error");

const addRole = Promise.coroutine(function* ({ email_address, role }) {
  const user = yield User.forge({ emailAddress: email_address }).fetch({ withRelated: ["roles"] });
  const roleAlreadyExists = user.related("roles").some(roleModel => roleModel.get("name") === role);

  if (roleAlreadyExists) {
    throw new RoleAlreadyExistsError();
  }

  return user.related("roles").create({ name: role });
});

const removeRole = roleId => Role.forge({ id: roleId }).destroy();

module.exports = {
  addRole,
  removeRole,
};
