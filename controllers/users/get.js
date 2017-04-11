const Service = appRequire("lib/users/service");
const Validator = appRequire("lib/users/get/validator");

const { respondCustomError } = appRequire("helpers/responses");
const UserNotFoundError = appRequire("lib/users/errors/user_not_found_error");

const getUser = (request, reply) => {
  const { params, user } = request;
  const { userId } = params;

  Service.getUser(user, userId)
    .then(u => reply(u))
    .catch(
      UserNotFoundError,
      respondCustomError(reply) // eslint-disable-line
    );
};

const getUsers = (request, reply) => {
  const { user, query } = request;

  Service.getUsers(user, query)
    .then(users => reply(users));
};

module.exports = [
  {
    method: "GET",
    path: "/users",
    handler: getUsers,
    config: {
      validate: {
        query: Validator,
      },
    },
  },
  {
    method: "GET",
    path: "/users/{userId}",
    handler: getUser,
  },
];
