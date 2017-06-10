const { respondCustomError } = appRequire("helpers/responses");
const Service = appRequire("lib/camps/service");
const Validator = appRequire("lib/users/camps/get/validator");

const UserNotFoundError = appRequire("lib/users/errors/user_not_found_error");

const get = ({ params, query }, reply) => {
  const { userId } = params;

  Service.getCampsByUser(userId, query)
    .then(reply)
    .catch(UserNotFoundError, respondCustomError(reply));
};

module.exports = {
  method: "GET",
  path: "/api/v1/users/{userId}/camps",
  handler: get,
  config: {
    validate: {
      query: Validator,
    },
  },
};
