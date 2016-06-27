'use strict';


//---------//
// Imports //
//---------//

const chai = require('chai')
  , fp = require('lodash/fp')
  , madonna = require('madonna-fp')
  , madonnaFunction = require('../lib')
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai');


//------//
// Init //
//------//

chai.should();
chai.use(sinonChai);
const errorIds = madonna.ERROR_IDS;


//------//
// Main //
//------//

describe('create', () => {
  it('should throw correct errors upon invalid arguments', () => {
    let err;

    try { madonnaFunction.create(); }
    catch(e) { err = e; }
    err.id.should.equal(errorIds.missingRequiredKeys);
    err = undefined;

    const validatedNoop = madonnaFunction.create({
      marg: { name: ['require', 'isLadenString'] }
      , fn: fp.noop
    });
    try { validatedNoop(); }
    catch(e) { err = e; }
    err.id.should.equal(errorIds.missingRequiredKeys);
    err = undefined;

    try { validatedNoop({ name: { notALadenString: 'fail' } }); }
    catch(e) { err = e; }
    err.id.should.equal(errorIds.criterionFailed);
    err = undefined;

    const mappedArgs = madonnaFunction.create({
      marg: { name: ['require', 'isLadenString'] }
      , argMap: {
        name: fp.toUpper
      }
      , fn: fp.noop
    });

    try { mappedArgs({ name: { notALadenString: 'fail' } }); }
    catch(e) { err = e; }
    err.id.should.equal(errorIds.criterionFailed);
    err = undefined;
  });

  it('should call the function with the correct arguments', () => {
    // non-mapper
    let mySpy = sinon.spy();
    const myFn = madonnaFunction.create({
      marg: { name: ['require', 'isLadenString'] }
      , fn: mySpy
    });

    myFn({ name: 'phil' });
    mySpy.should.have.been.calledWith({ name: 'phil' });
    mySpy.reset();

    const myMappedFn = madonnaFunction.create({
      marg: { name: ['require', 'isLadenString'] }
      , fn: mySpy
      , argMap: {
        name: fp.toUpper
      }
    });

    myMappedFn({ name: 'phil' });
    mySpy.should.have.been.calledWith({ name: 'PHIL' });
  });
});
