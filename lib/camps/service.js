const Promise = require("bluebird");

const Camp = appRequire("models/camp");
const User = appRequire("models/user");

const getEnrollmentQuery = (builder, userId) =>
  builder
    .select("*")
    .from("role_camp")
    .innerJoin("role", "role_camp.role_id", "role.id")
    .innerJoin("user", "role.user_id", "user.id")
    .where({
      "user.id": userId,
      "role_camp.deleted_at": null,
      "role.deleted_at": null,
    })
    .whereRaw("role_camp.camp_id = camp.id");

const setCampEnrolledQuery = (qb, userId, enrolled) => {
  if (enrolled) {
    qb.whereExists(function () {
      getEnrollmentQuery(this, userId);
    });
  } else {
    qb.whereNotExists(function () {
      getEnrollmentQuery(this, userId);
    });
  }
};

const createCamp = attributes => Camp.forge(attributes).save();
const getCamps = () => Camp.forge().fetchAll();
const getCamp = id => Camp.forge({ id }).fetch({ withRelated: ["itineraries", "roles.user"] });

const updateCamp = (campId, attributes) =>
  Camp.forge({ id: campId }).save(attributes, { patch: true })
    .then(camp => getCamp(camp.get("id")));

const deleteCamp = campId =>
  Camp.forge({ id: campId }).destroy();

const getCampsByUser = Promise.coroutine(function* (userId, { enrolled }) {
  yield User.forge({ id: userId }).fetch();

  return Camp.query((qb) => {
    setCampEnrolledQuery(qb, userId, enrolled);
  }).fetchAll({ withRelated: ["itineraries", "roles.user"] });
});

module.exports = {
  createCamp,
  getCamps,
  getCamp,
  updateCamp,
  deleteCamp,
  getCampsByUser,
};
