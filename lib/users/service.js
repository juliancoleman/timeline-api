const R = require("ramda");
const Promise = require("bluebird");

const Bookshelf = appRequire("config/bookshelf");
const AuthService = appRequire("lib/authentication/service");
const addOrderByQuery = appRequire("helpers/add_order_by_query");

const User = appRequire("models/user");
const Role = appRequire("models/role");
const Camp = appRequire("models/camp");
const RoleCamp = appRequire("models/role_camp");

const UserAlreadyExistsError = appRequire("lib/users/errors/user_already_exists_error");
const CampAlreadyAddedError = appRequire("lib/camps/errors/camp_already_added_error");
const RoleNotFoundError = appRequire("lib/roles/errors/role_not_found_error");

const createUser = Promise.coroutine(function* (attributes) {
  const existingUser = yield User.forge({
    emailAddress: attributes.email_address,
  }).fetch({ require: false });

  if (existingUser) {
    throw new UserAlreadyExistsError("Email already taken");
  }

  return Bookshelf.transaction(Promise.coroutine(function* (t) {
    const options = { transacting: t };
    const user = yield User.forge(R.omit("role", attributes)).save(null, options);

    const { role } = attributes;

    if (role) {
      yield Promise.each(role, roleName => user.related("roles").create({ name: roleName }, options));
    }

    user.set("token", AuthService.signToken(user));
    return user;
  }));
});


const deleteUser = Promise.coroutine(function* (userId) {
  yield User.forge({ id: userId }).destroy();
  yield Role.forge({ userId }).destroy();
});

const getUsers = ({ roles, enrolled, pageSize, page, sort }) =>
  User.query((qb) => {
    if (roles) {
      qb.whereIn("role.name", roles);
    }

    if (enrolled) {
      qb.innerJoin("role_camp", "role.id", "role_camp.role_id");
      qb.innerJoin("camp", "role_camp.camp_id", "camp.id");
    }

    addOrderByQuery(qb, sort);
  })
  .fetchPage({ pageSize, page })
  .then(result => ({ users: result.models, paginationData: result.pagination }));

const getUser = id => User.forge({ id }).fetch({ withRelated: ["roles"] });
const updateUser = (userId, attributes) =>
  User.forge({ id: userId }).save(attributes, { patch: true })
    .then(user => getUser(user.get("id")));

const addUserToCamp = (userId, { camp_id, role }) =>
  Bookshelf.transaction(Promise.coroutine(function* (t) {
    const options = { transacting: t };

    const user = yield User.forge({ id: userId }).fetch(
      R.merge({ withRelated: "roles" }, options) // eslint-disable-line
    );

    const requestedRole = user.related("roles").find(userRole => userRole.get("name") === role);

    if (!requestedRole) {
      throw new RoleNotFoundError();
    }

    const camp = yield Camp.forge({ id: camp_id }).fetch(options);

    const campAlreadyAdded = yield RoleCamp
      .query(qb => qb
        .innerJoin("role", "role_camp.role_id", "role.id")
        .where("role_camp.camp_id", camp_id)
        .where("role.user_id", userId)
        .whereNull("role_camp.deleted_at")
        .whereNull("role.deleted_at") // eslint-disable-line
      )
      .count("*", options)
      .then(count => count > 0);

    if (campAlreadyAdded) {
      throw new CampAlreadyAddedError();
    }

    yield camp.related("roles").attach(requestedRole, options);

    return camp.refresh(options);
  }));

const removeUserFromCamp = (userId, campId) =>
  Bookshelf.transaction(Promise.coroutine(function* (t) {
    const options = { transacting: t };
    const user = yield User.forge({ id: userId }).fetch(
      R.merge({ withRelated: "roles" }, options) // eslint-disable-line
    );

    yield Camp.forge({ id: campId }).fetch(options);

    const enrollment = yield RoleCamp.query((qb) => {
      qb.where("role_camp.camp_id", campId);
      qb.whereIn("role_camp.role_id", user.related("roles").map("id"));
    }).fetch(options);

    return yield enrollment.destroy(options);
  }));

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUser,
  addUserToCamp,
  removeUserFromCamp,
};
