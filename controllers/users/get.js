const { respondCustomError } = appRequire("helpers/responses");
const Service = appRequire("lib/users/service");
const Validator = appRequire("lib/users/get/validator");

const UserNotFoundError = appRequire("lib/users/errors/user_not_found_error");

const getUser = ({ params }, reply) => {
  const { userId } = params;

  Service.getUser(userId)
    .then(reply)
    .catch(UserNotFoundError, respondCustomError(reply));
};

const getUsers = ({ query }, reply) => {
  Service.getUsers(query)
    .then(reply)
    .catch(respondCustomError(reply));
};

const getUserByBarcode = ({ params }, reply) => {
  const { barcodeNumber } = params;

  Service.getUserByBarcode(barcodeNumber)
    .then(reply)
    .catch(UserNotFoundError, respondCustomError(reply));
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
  {
    method: "GET",
    path: "/api/v1/users/barcode/{barcodeNumber}",
    handler: getUserByBarcode,
  },
];
