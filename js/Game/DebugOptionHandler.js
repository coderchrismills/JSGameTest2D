// This should be a mapping. Allow users to add to the list.
var DebugOption  = {
    bEnabled : false,
    sName : ""
};

var DebugOptions = [];
var bDebugPhysicsEnabled = false;
var PHYSICS_OPTION       = "DrawPhysics";
/******************************************************************************/
function isDebugOptionEnabled(option) {
    if(option === "DrawPhysics") {
        return bDebugPhysicsEnabled;
    }
}
/******************************************************************************/
function enableDebugOption(option) {
    if(option === "DrawPhysics") {
        bDebugPhysicsEnabled = true;
    }
}
/******************************************************************************/
function disableDebugOption(option) {
    if(option === "DrawPhysics")
}