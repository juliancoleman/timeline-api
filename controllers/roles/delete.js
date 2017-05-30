const { respondCustomError } = appRequire("helpers/responses");
const Service = appRequire("lib/roles/service");
const Validator = appRequire("lib/roles/delete/validator");

const RoleNotFoundError = appRequire("lib/roles/errors/role_not_found_error");

const remove = ({ params }, reply) => {
  const { roleId } = params;

  Service.removeRole(roleId)
    .then(() => reply().code(204))
    .catch(RoleNotFoundError, respondCustomError(reply));
};

module.exports = {
  method: "DELETE",
  path: "/api/v1/roles/{roleId}",
  handler: remove,
  config: {
    validate: {
      params: Validator,
    },
  },
};
