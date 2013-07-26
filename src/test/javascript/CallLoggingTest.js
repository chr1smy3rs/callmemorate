/**
 * Created with IntelliJ IDEA.
 * User: chr1smy3rs
 * Date: 7/18/13
 * Time: 1:58 PM
 *
 * Test cases to test call logging javascript objects.
 */

TestCase("CallLoggingTest", {
    "test log ani": function() {
        var call = new IvrCall("1111111111", "222222");
        assertEquals("1111111111", call.ani);
        assertEquals("222222", call.dnis);
        call.endCall("far end disconnect", "user disconnected")
        assertEquals("far end disconnect", call.disposition);
        assertEquals("user disconnected", call.reason);
    },
    "test log state": function() {
        var call = new IvrCall("1111111112", "222222");
        assertEquals("1111111112", call.ani);
        var currentState = call.addState("1020_initialize");
        assertEquals("1020_initialize", currentState.stateId);
        assertEquals(1, call.states.length);
        assertEquals("1020_initialize", call.states[0].stateId);
        call.endCall("far end disconnect", "user disconnected")
        assertEquals("far end disconnect", call.disposition);
        assertEquals("user disconnected", call.reason);
    },
    "test log states": function() {
        var call = new IvrCall("1111111113", "222222");
        assertEquals("1111111113", call.ani);
        assertEquals("222222", call.dnis);
        call.addState("1020_initialize");
        call.addState("1040_dnisLookup");
        call.addState("8020_greeting");
        call.addState("8040_aniLookup");
        call.addState("8200_noAniTransitional");
        call.addState("2020_getPhoneNumber");
        assertEquals("1020_initialize", call.states[0].stateId);
        assertEquals("1040_dnisLookup", call.states[1].stateId);
        assertEquals("8020_greeting", call.states[2].stateId);
        assertEquals("8040_aniLookup", call.states[3].stateId);
        assertEquals("8200_noAniTransitional", call.states[4].stateId);
        assertEquals("2020_getPhoneNumber", call.states[5].stateId);
        assertEquals(6, call.states.length);
        call.endCall("far end disconnect", "user disconnected")
        assertEquals("far end disconnect", call.disposition);
        assertEquals("user disconnected", call.reason);
    } ,
    "test log attempts": function() {
        var call = new IvrCall("1111111114", "222222");
        assertEquals("1111111114", call.ani);
        assertEquals("222222", call.dnis);
        call.addState("1020_initialize");
        call.addState("1040_dnisLookup");
        call.addState("8020_greeting");
        call.addState("8040_aniLookup");
        call.addState("8200_noAniTransitional");
        var currentState = call.addState("2020_getPhoneNumber");
        assertEquals("1020_initialize", call.states[0].stateId);
        assertEquals("1040_dnisLookup", call.states[1].stateId);
        assertEquals("8020_greeting", call.states[2].stateId);
        assertEquals("8040_aniLookup", call.states[3].stateId);
        assertEquals("8200_noAniTransitional", call.states[4].stateId);
        assertEquals("2020_getPhoneNumber", call.states[5].stateId);
        assertEquals(6, call.states.length);
        currentState.addAttempt("nomatch")
        currentState.addAttempt("noinput")
        currentState.addAttempt("match", 0.96, "11111111111", "voice")
        assertEquals(3, currentState.attempts.length)
        assertEquals("nomatch", currentState.attempts[0].result)
        call.endCall("far end disconnect", "user disconnected")
        assertEquals("far end disconnect", call.disposition);
        assertEquals("user disconnected", call.reason);
    }  ,
    "test log checkpoints": function() {
        var call = new IvrCall("1111111115", "222222");
        assertEquals("1111111115", call.ani);
        assertEquals("222222", call.dnis);
        call.addState("1020_initialize");
        call.addState("1040_dnisLookup");
        call.addState("8020_greeting");
        call.addState("8040_aniLookup");
        call.addState("8200_noAniTransitional");
        var currentState = call.addState("2020_getPhoneNumber");
        assertEquals("1020_initialize", call.states[0].stateId);
        assertEquals("1040_dnisLookup", call.states[1].stateId);
        assertEquals("8020_greeting", call.states[2].stateId);
        assertEquals("8040_aniLookup", call.states[3].stateId);
        assertEquals("8200_noAniTransitional", call.states[4].stateId);
        assertEquals("2020_getPhoneNumber", call.states[5].stateId);
        assertEquals(6, call.states.length);
        currentState.addAttempt("nomatch")
        currentState.addAttempt("noinput")
        currentState.addAttempt("match", 0.96, "11111111111", "voice")
        assertEquals(3, currentState.attempts.length)
        assertEquals("nomatch", currentState.attempts[0].result)
        call.addCheckpoint("phone number retrieved")
        call.endCall("far end disconnect", "user disconnected")
        assertEquals("far end disconnect", call.disposition);
        assertEquals("user disconnected", call.reason);
    }
});
