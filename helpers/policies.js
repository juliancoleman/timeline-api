const R = require("ramda");
const MrHorse = require("mrhorse");

const mapPolicyResults = R.compose(R.values, R.map(R.prop("canContinue")));
const logicalOrContinue = R.compose(R.any(R.identity), mapPolicyResults);
const logicalAndContinue = R.compose(R.all(R.identity), mapPolicyResults);

const logicalOrPolicies = policies =>
  MrHorse.parallel(
    ...policies,
    (ranPolicies, results, next) => {
      next(null, logicalOrContinue(results));
    } // eslint-disable-line
  );

const logicalAndPolicies = policies =>
  MrHorse.parallel(
    ...policies,
    (ranPolicies, results, next) => {
      next(null, logicalAndContinue(results));
    } // eslint-disable-line
  );

module.exports = {
  logicalOrPolicies,
  logicalAndPolicies,
};
