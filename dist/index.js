/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var actionTypes = {
  CHANGE_PERSONA_STATE: 'CHANGE_PERSONA_STATE'
},
    initialState = {
  pdp: {
    personalization: {}
  }
};

/**
 * Function to manipulate the reducers
 */
var Reducer = function () {};

/**
 * Function to manipulate the application state
 * @param {object} action - action to change the state
 * @param {object} state - state of application
 */
Reducer.prototype.stateReducer = function (action, state) {
  try {
    var status = action && action.payload ? action.payload : initialState;

    switch (action.type) {
      case actionTypes.CHANGE_PERSONA_STATE:
        return Object.assign(state.pdp.persona, status);

      default:
        return state;
    }
  } catch (error) {
    console.error('nsState.stateReducer', error);
    return state;
  }
};

/**
 * Store where contains the states
 */
var NsStore = function () {}; //create the store

NsStore.prototype.reducers = new Reducer(); //added reducers dependencies
NsStore.prototype.actionTypes = actionTypes; //added action types to expose togheter (sorry)
NsStore.prototype.state = initialState; //state of application
NsStore.prototype.subscribers = {};

/**
 * Class to expose the store
 * @param {object} action object contains {type, payload}
 */
NsStore.prototype.dispatch = function (action) {
  try {
    var actionObj = {
      type: action && action.type ? action.type : '',
      payload: action && action.payload ? action.payload : null
    };

    var newState = this.reducers.stateReducer(actionObj, this.state);

    if (typeof this.subscribers[actionObj.type] === 'object') {
      this.subscribers[actionObj.type].forEach(function (sub) {
        sub(newState); //execute the callback
      });
    }

    this.state = newState;
  } catch (error) {
    console.error('nsState.dispatch', error);
  }
};

/**
 * function to subscribe the callback
 * to state event ocurrency
 * @param {function} callback - function to execute
 * @param {string} type - type of mutation to listener
 */
NsStore.prototype.subscribe = function (type, callback) {
  this.subscribers[type] = [];

  if (typeof callback === 'function') {
    this.subscribers[type].push(callback);
  }
};

//export store
window.freedom.NsStore = new NsStore();

/***/ })
/******/ ]);