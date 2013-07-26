/**
 * Created with IntelliJ IDEA.
 * User: chr1smy3rs
 * Date: 7/17/13
 * Time: 1:57 PM
 *
 * Call Reporting Javascript for building call detail records
 */

function IvrCall(ani, dnis) {
    this.ani = ani;
    this.dnis = dnis
    this.startTime = new Date();
    this.states = new Array();
    this.checkpoints = new Array();
};

function IvrState(stateId) {
    this.stateId = stateId;
    this.startTime = new Date();
    this.attempts = new Array();
};

function IvrAttempt(result, confidence, utterance, inputMode) {
    this.result = result;
    this.time = new Date();
    this.confidence = typeof confidence !== 'undefined' ? confidence : 0.0;
    this.utterance = typeof utterance !== 'undefined' ? utterance : '';
    this.inputMode = typeof inputMode !== 'undefined' ? inputMode : '';
};

function IvrCheckpoint(value) {
    this.value = value;
    this.time = new Date();
}

IvrCall.prototype.addState = function(stateId) {

    var length = this.states.length;
    if(length > 0 ) this.states[length-1].endTime = new Date();

    var currentState = new IvrState(stateId);
    this.states.push(currentState);
    return currentState;

};

IvrState.prototype.addAttempt = function(result, confidence, utterance, inputMode) {
    this.attempts.push(new IvrAttempt(result, confidence, utterance, inputMode));
};

IvrCall.prototype.addCheckpoint = function(value) {
    this.checkpoints.push(new IvrCheckpoint(value));
};

IvrCall.prototype.endCall = function(disposition, reason) {

    this.endTime = new Date();
    this.disposition = disposition; //near-end disconnect, far-end disconnect, transfer
    this.reason = reason; //why?

    var length = this.states.length;
    if(length > 0 ) this.states[length-1].endTime = this.endTime;

};






