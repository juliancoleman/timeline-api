const Service = appRequire("lib/camps/service");
const Validator = appRequire("lib/camps/post/validator");

const post = ({ payload }, reply) => {
  Service.createCamp(payload)
    .then(camps => reply(camps));
};

module.exports = {
  method: "POST",
  path: "/camps",
  handler: post,
  config: {
    validate: {
      payload: Validator,
    },
  },
};
