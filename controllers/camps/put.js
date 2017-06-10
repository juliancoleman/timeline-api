const { respondCustomError } = appRequire("helpers/responses");
const Service = appRequire("lib/camps/service");
const Validator = appRequire("lib/camps/put/validator");

const CampNotFoundError = appRequire("lib/camps/errors/camp_not_found_error");

const put = ({ payload, params }, reply) => {
  const { campId } = params;

  Service.updateCamp(campId, payload)
    .then(reply)
    .catch(CampNotFoundError, respondCustomError(reply));
};

module.exports = {
  method: "PUT",
  path: "/api/v1/camps/{campId}",
  handler: put,
  config: {
    validate: {
      payload: Validator,
    },
  },
};
