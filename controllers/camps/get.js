const { respondCustomError } = appRequire("helpers/responses");
const Service = appRequire("lib/camps/service");

const CampNotFoundError = appRequire("lib/camps/errors/camp_not_found_error");

const getCamps = (request, reply) => {
  Service.getCamps()
    .then(reply)
    .catch(respondCustomError(reply));
};

const getCamp = ({ params }, reply) => {
  const { campId } = params;

  Service.getCamp(campId)
    .then(reply)
    .catch(CampNotFoundError, respondCustomError(reply));
};

module.exports = [
  {
    method: "GET",
    path: "/api/v1/camps",
    handler: getCamps,
  },
  {
    method: "GET",
    path: "/api/v1/camps/{campId}",
    handler: getCamp,
  },
];
