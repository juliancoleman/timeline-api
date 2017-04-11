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
    path: "/camps",
    handler: getCamps,
  },
  {
    method: "GET",
    path: "/camps/{campId}",
    handler: getCamp,
  },
];
