const Service = appRequire("lib/camps/service");

const getCamps = (request, reply) => {
  Service.getCamps()
    .then(camps => reply(camps));
};

const getCamp = ({ params }, reply) => {
  const { campId } = params;

  Service.getCamp(campId)
    .then(camp => reply(camp));
};

module.exports = [
  {
    method: "GET",
    path: "/api/v1/camps",
    handler: getCamps,
  },
  {
    method: "GET",
    path: "/api/v1/camps/{campId}",
    handler: getCamp,
  },
];
