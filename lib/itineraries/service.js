const Promise = require("bluebird");
// const R = require("ramda");

const User = appRequire("models/user");
const Role = appRequire("models/role");
const Camp = appRequire("models/camp");
const RoleCamp = appRequire("models/role_camp");
const Itinerary = appRequire("models/itinerary");
const Checkin = appRequire("models/checkin");

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

const getItinerary = itineraryId => Itinerary.forge({ id: itineraryId }).fetch();
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
