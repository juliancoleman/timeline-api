const { respondCustomError } = appRequire("helpers/responses");
const Service = appRequire("lib/users/service");

const UserNotFoundError = appRequire("lib/users/errors/user_not_found_error");
const CampNotFoundError = appRequire("lib/camps/errors/camp_not_found_error");
const RoleCampNotFoundError = appRequire("lib/roles/errors/role_camp_not_found_error");

const get = ({ params, query }, reply) => {
  const { userId, campId } = params;

  Service.removeUserFromCamp(userId, campId)
    .then(() => reply().code(204))
    .catch(
      UserNotFoundError,
      CampNotFoundError,
      RoleCampNotFoundError,
      respondCustomError(reply) // eslint-disable-line
    );
};

module.exports = {
  method: "DELETE",
  path: "/api/v1/users/{userId}/camps/{campId}",
  handler: get,
};
