const { respondCustomError } = appRequire("helpers/responses");
const Service = appRequire("lib/itineraries/service");

const ItineraryNotFoundError = appRequire("lib/itineraries/errors/itinerary_not_found_error");

const getItineraries = ({ user }, reply) => {
  Service.getItineraries(user)
    .then(reply)
    .catch(respondCustomError(reply));
};

const getItinerary = ({ params }, reply) => {
  const { itineraryId } = params;

  Service.getItinerary(itineraryId)
    .then(reply)
    .catch(ItineraryNotFoundError, respondCustomError(reply));
};

module.exports = [
  {
    method: "GET",
    path: "/api/v1/itineraries",
    handler: getItineraries,
  },
  {
    method: "GET",
    path: "/api/v1/itineraries/{itineraryId}",
    handler: getItinerary,
  },
];
