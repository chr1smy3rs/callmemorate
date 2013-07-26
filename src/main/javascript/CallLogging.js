/**
 * Copyright (c) 2013, Chris Myers
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 1. Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * 3. All advertising materials mentioning features or use of this software
 * must display the following acknowledgement:
 * This product includes software developed by Chris Myers.
 * 4. Neither the name of the Chris Myers nor the
 * names of its contributors may be used to endorse or promote products
 * derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY CHRIS MYERS ''AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL CHRIS MYERS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
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






