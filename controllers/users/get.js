const Service = appRequire("lib/users/service");
const Validator = appRequire("lib/users/get/validator");

const { respondCustomError } = appRequire("helpers/responses");
const UserNotFoundError = appRequire("lib/users/errors/user_not_found_error");

const getUser = (request, reply) => {
  const { params } = request;
  const { userId } = params;

  Service.getUser(userId)
    .then(user => reply(user))
    .catch(
      UserNotFoundError,
      respondCustomError(reply) // eslint-disable-line
    );
};

const getUsers = (request, reply) => {
  const { query } = request;

  Service.getUsers(query)
    .then(users => reply(users));
};

module.exports = [
  {
    method: "GET",
    path: "/api/v1/users",
    handler: getUsers,
    config: {
      validate: {
        query: Validator,
      },
    },
  },
  {
    method: "GET",
    path: "/api/v1/users/{userId}",
    handler: getUser,
  },
];
