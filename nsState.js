'use strict';

var actionTypes = {
    CHANGE_PERSONA_STATE: 'CHANGE_PERSONA_STATE'
  }
, initialState = {
    pdp: {
      personalization: {}
    }
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
var NsStore = function(){}; //create the store

NsStore.prototype.reducers = new Reducer(); //added reducers dependencies
NsStore.prototype.actionTypes = actionTypes; //added action types to expose togheter (sorry)
NsStore.prototype.state = initialState; //state of application
NsStore.prototype.subscribers = {};

/**
 * Class to expose the store
 * @param {object} action object contains {type, payload}
 */
NsStore.prototype.dispatch = function(action) {
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
    console.error('nsState.dispatch', error);
  }
};

/**
 * function to subscribe the callback
 * to state event ocurrency
 * @param {function} callback - function to execute
 * @param {string} type - type of mutation to listener
 */
NsStore.prototype.subscribe = function(type, callback) {
  this.subscribers[type] = [];

  if(typeof callback === 'function') {
    this.subscribers[type].push(callback);
  }
};

//export store
window.freedom.NsStore = new NsStore();
