const { respondCustomError } = appRequire("helpers/responses");
const Service = appRequire("lib/itineraries/service");

const ItineraryNotFoundError = appRequire("lib/itineraries/errors/itinerary_not_found_error");

const destroy = ({ params }, reply) => {
  const { itineraryId } = params;

  Service.deleteItinerary(itineraryId)
    .then(() => reply().code(204))
    .catch(ItineraryNotFoundError, respondCustomError(reply));
};

module.exports = {
  method: "DELETE",
  path: "/api/v1/itineraries/{itineraryId}",
  handler: destroy,
};
