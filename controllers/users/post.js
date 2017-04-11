const { respondCustomError } = appRequire("helpers/responses");
const Service = appRequire("lib/users/service");
const Validator = appRequire("lib/users/post/validator");

const UserAlreadyExistsError = appRequire("lib/users/errors/user_already_exists_error");

const post = (request, reply) => {
  const payload = request.payload;

  Service.createUser(payload)
    .then(response => reply(response.toJSON()).code(201))
    .catch(
      UserAlreadyExistsError,
      respondCustomError(reply) // eslint-disable-line
    );
};

module.exports = {
  method: "POST",
  path: "/users",
  handler: post,
  config: {
    auth: false,
    validate: {
      payload: Validator,
    },
  },
};