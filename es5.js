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
  !*** ./lib/index.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//
	// README
	// - A small wrapper around madonna-internal-fn.  I just want to give consumers
	//   the option to map their arguments prior to calling the function.
	//

	//---------//
	// Imports //
	//---------//

	var fp = __webpack_require__(/*! lodash/fp */ 1),
	    madonna = __webpack_require__(/*! madonna-fp */ 2),
	    madonnaFn = __webpack_require__(/*! madonna-internal-fn */ 3),
	    madonnaMap = __webpack_require__(/*! madonna-map */ 4);

	//------//
	// Init //
	//------//

	var madonnaFunctionSchema = getMadonnaFunctionSchema(),
	    createMapper = madonnaMap.createMapper;

	//------//
	// Main //
	//------//

	var exportCreate = madonnaFn({
	  marg: madonnaFunctionSchema,
	  fn: create
	});

	function create(argsObj) {
	  var argMap = argsObj.argMap;
	  var fn = argsObj.fn;
	  var marg = argsObj.marg;


	  var validatorFn = argMap ? createMapper({ marg: marg, argMap: argMap }) : madonna.createIdentityValidator(marg);

	  return fp.flow(validatorFn, fn);
	}

	//-------------//
	// Helper Fxns //
	//-------------//

	function getMadonnaFunctionSchema() {
	  return {
	    marg: ['require', 'isLadenPlainObject'],
	    fn: ['require', 'isFunction'],
	    name: ['isLadenString'],
	    argMap: madonnaMap._getArgMapSchema(false)
	  };
	}

	//---------//
	// Exports //
	//---------//

	module.exports = {
	  create: exportCreate
	};

/***/ },
/* 1 */
/*!****************************!*\
  !*** external "lodash/fp" ***!
  \****************************/
/***/ function(module, exports) {

	module.exports = require("lodash/fp");

/***/ },
/* 2 */
/*!*****************************!*\
  !*** external "madonna-fp" ***!
  \*****************************/
/***/ function(module, exports) {

	module.exports = require("madonna-fp");

/***/ },
/* 3 */
/*!**************************************!*\
  !*** external "madonna-internal-fn" ***!
  \**************************************/
/***/ function(module, exports) {

	module.exports = require("madonna-internal-fn");

/***/ },
/* 4 */
/*!******************************!*\
  !*** external "madonna-map" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("madonna-map");

/***/ }
/******/ ]);