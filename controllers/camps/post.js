const { respondCustomError } = appRequire("helpers/responses");
const Service = appRequire("lib/camps/service");
const Validator = appRequire("lib/camps/post/validator");

const post = ({ payload }, reply) => {
  Service.createCamp(payload)
    .then(reply)
    .catch(respondCustomError(reply));
};

module.exports = {
  method: "POST",
  path: "/api/v1/camps",
  handler: post,
  config: {
    validate: {
      payload: Validator,
    },
  },
};
