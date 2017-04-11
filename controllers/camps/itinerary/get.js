const { respondCustomError } = appRequire("helpers/responses");
const Service = appRequire("lib/itineraries/service");

const CampNotFoundError = appRequire("lib/camps/errors/camp_not_found_error");
const ItineraryNotFoundError = appRequire("lib/itineraries/errors/itinerary_not_found_error");

const getCampItineraries = ({ params }, reply) => {
  const { campId } = params;

  Service.getCampItineraries(campId)
    .then(itineraries => reply(itineraries))
    .catch(
      ItineraryNotFoundError,
      CampNotFoundError,
      respondCustomError(reply) // eslint-disable-line
    );
};

module.exports = {
  method: "GET",
  path: "/camps/{campId}/itineraries",
  handler: getCampItineraries,
};
