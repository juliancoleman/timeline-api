const { respondCustomError } = appRequire("helpers/responses");
const Service = appRequire("lib/itineraries/service.js");
const Validator = appRequire("lib/itineraries/checkins/post/validator");

const ItineraryNotFoundError = appRequire("lib/itineraries/errors/itinerary_not_found_error");
const UserNotFoundError = appRequire("lib/users/errors/user_not_found_error");
const RoleNotFoundError = appRequire("lib/roles/errors/role_not_found_error");

const post = ({ payload, params }, reply) => {
  const { itineraryId } = params;

  Service.checkInStudent(itineraryId, payload)
    .then(checkin => reply(checkin))
    .catch(
      UserNotFoundError,
      RoleNotFoundError,
      ItineraryNotFoundError,
      respondCustomError(reply) // eslint-disable-line
    );
};

module.exports = {
  method: "POST",
  path: "/api/v1/itineraries/{itineraryId}/checkin",
  handler: post,
  config: {
    validate: {
      payload: Validator,
    },
  },
};
