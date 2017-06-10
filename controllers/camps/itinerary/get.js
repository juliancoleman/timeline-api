const { respondCustomError } = appRequire("helpers/responses");
const Service = appRequire("lib/itineraries/service");

const CampNotFoundError = appRequire("lib/camps/errors/camp_not_found_error");
const ItineraryNotFoundError = appRequire("lib/itineraries/errors/itinerary_not_found_error");

const get = ({ params }, reply) => {
  const { campId } = params;

  Service.getCampItineraries(campId)
    .then(reply)
    .catch(
      ItineraryNotFoundError,
      CampNotFoundError,
      respondCustomError(reply) // eslint-disable-line
    );
};

module.exports = {
  method: "GET",
  path: "/api/v1/camps/{campId}/itineraries",
  handler: get,
};
