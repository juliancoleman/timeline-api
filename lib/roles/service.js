const Promise = require("bluebird");

const User = appRequire("models/user");
const RoleAlreadyExistsError = appRequire("lib/roles/errors/role_already_exists_error");

const addRole = Promise.coroutine(function* ({ email_address, role }) {
  const user = yield User.forge({ emailAddress: email_address }).fetch({ withRelated: ["roles"] });
  const roleAlreadyExists = user.related("roles").some(roleModel => roleModel.get("name") === role);

  if (roleAlreadyExists) {
    throw new RoleAlreadyExistsError();
  }

  yield user.related("roles").create({ name: role });

  return user;
});

module.exports = {
  addRole,
};
