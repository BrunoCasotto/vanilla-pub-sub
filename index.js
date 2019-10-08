'use strict';

var actionTypes = {
  STATE_EXAMPLE: 'STATE_EXAMPLE'
}
, initialState = {
  example: {}
};

/**
 * Function to manipulate the reducers
 */
var Reducer = function(){};

/**
 * Function to manipulate the application state
 * @param {object} action - action to change the state
 * @param {object} state - state of application
 */
Reducer.prototype.stateReducer = function(action, state) {
  try {
    var status = (action && action.payload) ? action.payload : initialState;

    switch (action.type) {
      case actionTypes.STATE_EXAMPLE:
        return Object.assign(state.example, status);

      default:
        return state;
    }
  } catch (error) {
    console.error('VanillaPubSub.stateReducer', error);
    return state;
  }
};


/**
 * Store where contains the states
 */
var VanillaPubSub = function(){}; //create the store

VanillaPubSub.prototype.reducers = new Reducer(); //added reducers dependencies
VanillaPubSub.prototype.actionTypes = actionTypes; //added action types to expose togheter (sorry)
VanillaPubSub.prototype.state = initialState; //state of application
VanillaPubSub.prototype.subscribers = {};

/**
 * Class to expose the store
 * @param {object} action object contains {type, payload}
 */
VanillaPubSub.prototype.dispatch = function(action) {
  try {
    var actionObj = {
      type: (action && action.type) ? action.type : ''
      , payload: (action && action.payload) ? action.payload : null
    };

    var newState = this.reducers.stateReducer(actionObj, this.state);

    if(typeof this.subscribers[actionObj.type] === 'object') {
      this.subscribers[actionObj.type].forEach(function(sub) {
        sub(newState); //execute the callback
      });
    }

    this.state = newState;
  } catch (error) {
    console.error('vanilaPubSub.dispatch', error);
  }
};

/**
 * function to subscribe the callback
 * to state event ocurrency
 * @param {function} callback - function to execute
 * @param {string} type - type of mutation to listener
 */
VanillaPubSub.prototype.subscribe = function(type, callback) {
  this.subscribers[type] = [];

  if(typeof callback === 'function') {
    this.subscribers[type].push(callback);
  }
};

//export store
window.VanillaPubSub = new VanillaPubSub();
