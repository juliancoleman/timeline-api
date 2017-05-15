const { respondCustomError } = appRequire("helpers/responses");
const Service = appRequire("lib/itineraries/service");
const Validator = appRequire("lib/itineraries/post/validator");

const CampNotFoundError = appRequire("lib/camps/errors/camp_not_found_error");

const post = ({ payload, params }, reply) => {
  const { campId } = params;

  Service.createItinerary(campId, payload)
    .then(itinerary => reply(itinerary))
    .catch(
      CampNotFoundError,
      respondCustomError(reply) // eslint-disable-line
    );
};

module.exports = {
  method: "POST",
  path: "/api/v1/camps/{campId}/itineraries",
  handler: post,
  config: {
    validate: {
      payload: Validator,
    },
  },
};
