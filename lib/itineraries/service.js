const Promise = require("bluebird");
const R = require("ramda");

const User = appRequire("models/user");
const Role = appRequire("models/role");
const Camp = appRequire("models/camp");
const RoleCamp = appRequire("models/role_camp");
const Itinerary = appRequire("models/itinerary");
const Checkin = appRequire("models/checkin");

const { knex } = appRequire("config/bookshelf");

const CampNotFoundError = appRequire("lib/camps/errors/camp_not_found_error");

const createItinerary = Promise.coroutine(function* (campId, { event_date, location }) {
  const camp = yield Camp.forge({ id: campId }).fetch();

  if (!camp) {
    throw new CampNotFoundError();
  }

  return Itinerary.forge({ camp_id: campId, event_date, location }).save();
});

const getCampItineraries = Promise.coroutine(function* (campId) {
  const camp = yield Camp.forge({ id: campId }).fetch();

  if (!camp) {
    throw new CampNotFoundError();
  }

  return Itinerary.forge({ camp_id: campId }).fetchAll();
});

const getItineraries = user =>
  Itinerary.forge().accessibleCampusLeaderItineraries(user).fetchAll();

const getItinerary = Promise.coroutine(function* (itineraryId) {
  const itinerary = yield Itinerary.forge({ id: itineraryId }).fetch();
  const checkedInStudents = yield knex
    .select("user.*")
    .from("user")
    .innerJoin("role", "user.id", "role.user_id")
    .innerJoin("role_camp", "role.id", "role_camp.role_id")
    .innerJoin("checkin", "role_camp.id", "checkin.role_camp_id")
    .innerJoin("itinerary", "checkin.itinerary_id", "itinerary.id")
    .where({
      "role.name": "Student",
      "itinerary.id": itineraryId,
      "user.deleted_at": null,
      "role.deleted_at": null,
      "role_camp.deleted_at": null,
      "checkin.deleted_at": null,
      "itinerary.deleted_at": null,
    })
    .then(R.map(user => User.forge(user, { parse: true })));

  const notCheckedInStudents = yield knex
    .select("user.*")
      .from("user")
      .innerJoin("role", "user.id", "role.user_id")
      .innerJoin("role_camp", "role.id", "role_camp.role_id")
      .innerJoin("camp", "role_camp.camp_id", "camp.id")
      .innerJoin("itinerary", "camp.id", "itinerary.camp_id")
      .leftJoin("checkin", "itinerary.id", "checkin.itinerary_id")
      .where({
        "role.name": "Student",
        "checkin.id": null,
        "itinerary.id": itineraryId,
        "user.deleted_at": null,
        "role.deleted_at": null,
        "role_camp.deleted_at": null,
        "checkin.deleted_at": null,
        "itinerary.deleted_at": null,
      })
      .then(R.map(user => User.forge(user, { parse: true })));

  const studentAttributesLens = R.lensPath(["attributes", "students"]);

  return R.set(studentAttributesLens, { notCheckedIn: notCheckedInStudents, checkedIn: checkedInStudents }, itinerary);
});

const deleteItinerary = itineraryId => Itinerary.forge({ id: itineraryId }).destroy();

const checkInStudent = Promise.coroutine(function* (itineraryId, { barcode_number }) {
  const itinerary = yield Itinerary.forge({ id: itineraryId }).fetch();
  const user = yield User.forge({ barcode_number }).fetch();
  const requestedRole = yield Role.forge({ user_id: user.get("id") }).fetch();
  const targetCampId = itinerary.get("campId");
  const camp = yield Camp.forge({ id: targetCampId }).fetch();

  const roleCamp = yield RoleCamp.forge({
    camp_id: camp.get("id"),
    role_id: requestedRole.get("id"),
  }).fetch();

  const checkin = yield Checkin.forge({
    role_camp_id: roleCamp.get("id"),
    itinerary_id: itinerary.get("id"),
  }).save();

  return checkin;
});

module.exports = {
  createItinerary,
  getCampItineraries,
  getItineraries,
  getItinerary,
  deleteItinerary,
  checkInStudent,
};
