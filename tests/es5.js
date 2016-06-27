module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**********************!*\
  !*** ./tests/es6.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//---------//
	// Imports //
	//---------//

	var chai = __webpack_require__(/*! chai */ 1),
	    fp = __webpack_require__(/*! lodash/fp */ 2),
	    madonna = __webpack_require__(/*! madonna-fp/es6 */ 3),
	    madonnaFunction = __webpack_require__(/*! ../es6 */ 4),
	    sinon = __webpack_require__(/*! sinon */ 5),
	    sinonChai = __webpack_require__(/*! sinon-chai */ 6);

	//------//
	// Init //
	//------//

	chai.should();
	chai.use(sinonChai);
	var errorIds = madonna.ERROR_IDS;

	//------//
	// Main //
	//------//

	describe('create', function () {
	  it('should throw correct errors upon invalid arguments', function () {
	    var err = void 0;

	    try {
	      madonnaFunction.create();
	    } catch (e) {
	      err = e;
	    }
	    err.id.should.equal(errorIds.missingRequiredKeys);
	    err = undefined;

	    var validatedNoop = madonnaFunction.create({
	      marg: { name: ['require', 'isLadenString'] },
	      fn: fp.noop
	    });
	    try {
	      validatedNoop();
	    } catch (e) {
	      err = e;
	    }
	    err.id.should.equal(errorIds.missingRequiredKeys);
	    err = undefined;

	    try {
	      validatedNoop({ name: { notALadenString: 'fail' } });
	    } catch (e) {
	      err = e;
	    }
	    err.id.should.equal(errorIds.criterionFailed);
	    err = undefined;

	    var mappedArgs = madonnaFunction.create({
	      marg: { name: ['require', 'isLadenString'] },
	      argMap: {
	        name: fp.toUpper
	      },
	      fn: fp.noop
	    });

	    try {
	      mappedArgs({ name: { notALadenString: 'fail' } });
	    } catch (e) {
	      err = e;
	    }
	    err.id.should.equal(errorIds.criterionFailed);
	    err = undefined;
	  });

	  it('should call the function with the correct arguments', function () {
	    // non-mapper
	    var mySpy = sinon.spy();
	    var myFn = madonnaFunction.create({
	      marg: { name: ['require', 'isLadenString'] },
	      fn: mySpy
	    });

	    myFn({ name: 'phil' });
	    mySpy.should.have.been.calledWith({ name: 'phil' });
	    mySpy.reset();

	    var myMappedFn = madonnaFunction.create({
	      marg: { name: ['require', 'isLadenString'] },
	      fn: mySpy,
	      argMap: {
	        name: fp.toUpper
	      }
	    });

	    myMappedFn({ name: 'phil' });
	    mySpy.should.have.been.calledWith({ name: 'PHIL' });
	  });
	});

/***/ },
/* 1 */
/*!***********************!*\
  !*** external "chai" ***!
  \***********************/
/***/ function(module, exports) {

	module.exports = require("chai");

/***/ },
/* 2 */
/*!****************************!*\
  !*** external "lodash/fp" ***!
  \****************************/
/***/ function(module, exports) {

	module.exports = require("lodash/fp");

/***/ },
/* 3 */
/*!*********************************!*\
  !*** external "madonna-fp/es5" ***!
  \*********************************/
/***/ function(module, exports) {

	module.exports = require("madonna-fp/es5");

/***/ },
/* 4 */
/*!*************************!*\
  !*** external "../es5" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = require("../es5");

/***/ },
/* 5 */
/*!************************!*\
  !*** external "sinon" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = require("sinon");

/***/ },
/* 6 */
/*!*****************************!*\
  !*** external "sinon-chai" ***!
  \*****************************/
/***/ function(module, exports) {

	module.exports = require("sinon-chai");

/***/ }
/******/ ]);