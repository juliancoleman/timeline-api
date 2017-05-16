const Promise = require("bluebird");
// const R = require("ramda");

const User = appRequire("models/user");
const Role = appRequire("models/role");
const Camp = appRequire("models/camp");
const RoleCamp = appRequire("models/role_camp");
const Itinerary = appRequire("models/itinerary");
const Checkin = appRequire("models/checkin");

const UserNotFoundError = appRequire("lib/users/errors/user_not_found_error");
const RoleNotFoundError = appRequire("lib/roles/errors/role_not_found_error");
const CampNotFoundError = appRequire("lib/camps/errors/camp_not_found_error");
const ItineraryNotFoundError = appRequire("lib/itineraries/errors/itinerary_not_found_error");

const createItinerary = Promise.coroutine(function* (campId, { event_date }) {
  const camp = yield Camp.forge({ id: campId }).fetch();

  if (!camp) {
    throw new CampNotFoundError();
  }

  return yield Itinerary.forge({ camp_id: campId, event_date }).save();
});

const getCampItineraries = Promise.coroutine(function* (campId) {
  const camp = yield Camp.forge({ id: campId }).fetch();

  if (!camp) {
    throw new CampNotFoundError();
  }

  return yield Itinerary.forge({ camp_id: campId }).fetchAll();
});

const getItineraries = () => Itinerary.forge().fetchAll();
const getItinerary = itineraryId => Itinerary.forge({ id: itineraryId }).fetch();

const checkInStudent = Promise.coroutine(function* (itineraryId, { barcode_number }) {
  const itinerary = yield Itinerary.forge({ id: itineraryId }).fetch();
  const targetCampId = itinerary.get("campId");

  if (!itinerary) {
    throw new ItineraryNotFoundError();
  }

  const user = yield User.forge({ barcode_number }).fetch();

  if (!user) {
    throw new UserNotFoundError();
  }

  const requestedRole = yield Role.forge({ user_id: user.get("id") }).fetch();

  if (!requestedRole) {
    throw new RoleNotFoundError();
  }

  const camp = yield Camp.forge({ id: targetCampId }).fetch();

  if (!camp) {
    throw new CampNotFoundError();
  }

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
  checkInStudent,
};
