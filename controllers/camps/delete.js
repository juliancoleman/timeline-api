const { respondCustomError } = appRequire("helpers/responses");
const Service = appRequire("lib/camps/service");
const Validator = appRequire("lib/camps/delete/validator");

const CampNotFoundError = appRequire("lib/camps/errors/camp_not_found_error");

const destroy = ({ params }, reply) => {
  const { campId } = params;

  Service.deleteCamp(campId)
    .then(camp => reply(camp))
    .catch(CampNotFoundError, respondCustomError(reply));
};

module.exports = {
  method: "DELETE",
  path: "/api/v1/camps/{campId}",
  handler: destroy,
  config: {
    validate: {
      params: Validator,
    },
  },
};
