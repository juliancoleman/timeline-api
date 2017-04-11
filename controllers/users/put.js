const { respondCustomError } = appRequire("helpers/responses");
const Service = appRequire("lib/users/service");
const Validator = appRequire("lib/users/put/validator");

const UserNotFoundError = appRequire("lib/users/errors/user_not_found_error");

const put = ({ payload, params }, reply) => {
  const { userId } = params;
  Service.updateUser(userId, payload)
    .then(user => reply(user))
    .catch(
      UserNotFoundError,
      respondCustomError(reply) // eslint-disable-line
    );
};

module.exports = {
  method: "PUT",
  path: "/users/{userId}",
  handler: put,
  config: {
    validate: {
      payload: Validator,
    },
  },
};
