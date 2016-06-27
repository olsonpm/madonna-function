'use strict';

//
// README
// - A small wrapper around madonna-internal-fn.  I just want to give consumers
//   the option to map their arguments prior to calling the function.
//


//---------//
// Imports //
//---------//

const fp = require('lodash/fp')
  , madonna = require('madonna-fp/es6')
  , madonnaFn = require('madonna-internal-fn/es6')
  , madonnaMap = require('madonna-map/es6');


//------//
// Init //
//------//

const madonnaFunctionSchema = getMadonnaFunctionSchema()
  , createMapper = madonnaMap.createMapper;


//------//
// Main //
//------//

const exportCreate = madonnaFn({
  marg: madonnaFunctionSchema
  , fn: create
});

function create(argsObj) {
  const { argMap, fn, marg } = argsObj;

  const validatorFn = (argMap)
    ? createMapper({ marg: marg, argMap: argMap})
    : madonna.createIdentityValidator(marg);

  return fp.flow(validatorFn, fn);
}


//-------------//
// Helper Fxns //
//-------------//

function getMadonnaFunctionSchema() {
  return {
    marg: ['require', 'isLadenPlainObject']
    , fn: ['require', 'isFunction']
    , name: ['isLadenString']
    , argMap: madonnaMap._getArgMapSchema(false)
  };
}


//---------//
// Exports //
//---------//

module.exports = {
  create: exportCreate
};
