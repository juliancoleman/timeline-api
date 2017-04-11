const R = require("ramda");

module.exports = (user, role) => {
  const roles = user.related("roles").map("attributes.name");

  return R.contains(role, roles);
};
