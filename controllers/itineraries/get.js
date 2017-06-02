const { respondCustomError } = appRequire("helpers/responses");
const Service = appRequire("lib/itineraries/service");

const ItineraryNotFoundError = appRequire("lib/itineraries/errors/itinerary_not_found_error");

const getItinerary = ({ params }, reply) => {
  const { itineraryId } = params;

  Service.getItinerary(itineraryId)
    .then(itinerary => reply(itinerary))
    .catch(
      ItineraryNotFoundError,
      respondCustomError(reply) // eslint-disable-line
    );
};

module.exports = {
  method: "GET",
  path: "/api/v1/itineraries/{itineraryId}",
  handler: getItinerary,
};
