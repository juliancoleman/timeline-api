const { respondCustomError } = appRequire("helpers/responses");
const Service = appRequire("lib/roles/service");
const Validator = appRequire("lib/roles/post/validator");

const UserNotFoundError = appRequire("lib/users/errors/user_not_found_error");
const RoleAlreadyExistsError = appRequire("lib/roles/errors/role_already_exists_error");

const post = ({ payload }, reply) =>
  Service.addRole(payload)
    .then(user => reply(user).code(201))
    .catch(
      UserNotFoundError,
      RoleAlreadyExistsError,
      respondCustomError(reply) // eslint-disable-line
    );

module.exports = {
  method: "POST",
  path: "/api/v1/roles",
  handler: post,
  config: {
    validate: {
      payload: Validator,
    },
  },
};
