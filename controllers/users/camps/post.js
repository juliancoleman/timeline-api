const { respondCustomError } = appRequire("helpers/responses");
const Service = appRequire("lib/users/service");
const Validator = appRequire("lib/users/camps/post/validator");

const UserNotFoundError = appRequire("lib/users/errors/user_not_found_error");
const RoleNotFoundError = appRequire("lib/roles/errors/role_not_found_error");
const CampNotFoundError = appRequire("lib/camps/errors/camp_not_found_error");
const CampAlreadyAddedError = appRequire("lib/camps/errors/camp_already_added_error");

const post = ({ params, payload }, reply) => {
  const { userId } = params;

  Service.addUserToCamp(userId, payload)
    .then(camp => reply(camp).code(201))
    .catch(
      UserNotFoundError,
      RoleNotFoundError,
      CampNotFoundError,
      CampAlreadyAddedError,
      respondCustomError(reply) // eslint-disable-line
    );
};

module.exports = {
  method: "POST",
  path: "/users/{userId}/camps",
  handler: post,
  config: {
    validate: {
      payload: Validator,
    },
  },
};
