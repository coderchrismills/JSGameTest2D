/******************************************************************************/
var mCanvas;
var mWorld = createWorld();
var mCtx;
var mStage;
var mCannon = new Cannon();
var mBalloons = [];
/******************************************************************************/
var mCanvasWidth;
var mCanvasHeight;
var mCanvasTop;
var mCanvasLeft;
var mWorldTimer;
/******************************************************************************/
var bGraphicsReady = false;
var bUpIsHeld = false;
var bDownIsHeld = false;
var bShotIsHeld = false;
var bIsGameRunning = false;
var bIsGameOver = false;
/******************************************************************************/
function handleKeyDown(e) {
    var evt = e;
    if(!evt) { evt = window.event; }
    
    switch(evt.keyCode) {
        case KEYCODE_SPACE: bShotIsHeld = true; break;
        case KEYCODE_A:;
        case KEYCODE_W:;
        case KEYCODE_UP:;
        case KEYCODE_LEFT:  bUpIsHeld = true; break;
        case KEYCODE_D:;
        case KEYCODE_S:;
        case KEYCODE_DOWN:;
        case KEYCODE_RIGHT: bDownIsHeld = true; break;
    }
}
/******************************************************************************/
function handleKeyUp(e) {
    var evt = e;
    if(!evt) { evt = window.event; }
    
    switch(evt.keyCode) {
        case KEYCODE_SPACE: bShotIsHeld = false; break;
        case KEYCODE_A:;
        case KEYCODE_W:;
        case KEYCODE_UP:;
        case KEYCODE_LEFT:  bUpIsHeld = false; break;
        case KEYCODE_D:;
        case KEYCODE_S:;
        case KEYCODE_DOWN:;
        case KEYCODE_RIGHT: bDownIsHeld = false; break;
    }
}
/******************************************************************************/
function registerKeys() {
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;   
}
/******************************************************************************/
function setupWorld(bsetup) {
    if ($('canvas') != null ) /* console.log("Canvas is reader"); */
    if(!bsetup) { bsetup = true; }
    mWorld = createWorld();
}
/******************************************************************************/
function redrawCanvas() {
    mCtx.save();
    mCtx.clearRect(0, 0, mCanvasWidth, mCanvasHeight);
    mCtx.restore();
}
/******************************************************************************/
function step() {
    var stepping = false;
    var timestep = 1.0 / 30.0;
    var iteration = 1;
    world.Step(timestep, iteration);
    redrawCanvas();
    drawWorld(mWorld, mCtx);
    if(bIsGameRunning)
        mWorldTimer = setTimeout('step()', 10);
}
/******************************************************************************/
function beginGame() {
    mCannon = createCannon(world, false, CANNON);
    var i = 0;
    for ( ; i < NUM_BALLOONS; i++) {
        var name = BALLOON + " " + i;
        var balloon = createBalloon(world, false, name);
        mBalloons.push(balloon);
    }
    // Create walls here. 
}
/******************************************************************************/
function preloadGameData() {
    drawPreloader();
    
    var item_load_count = 0;
    var item_load_array = ["cannon.png",
                           "cannon_ball.png",
                           "balloon.png",
                           "wall.png" ];
    var total_items = item_load_array.length;
    var i = 0;
    for ( ; i < total_items; i++) {
        var item_image = new Image();
        item_image.onload = function() {
            item_load_count++;
            if(item_load_count === total_items) {
                mCtx.clearRect(0, 0, mCanvasWidth, mCanvasHeight);
                mCanvas = document.getElementById('canvas');
                registerKeys();
                drawBeginGame();
            }
        }
        item_image.src = 'img/' + item_load_array[item_load_count];
    }
}
/******************************************************************************/
Event.observe(window, 'load', function() {
   setupWorld();
   var canvas_elm = $('canvas');
   mCtx = canvas_elm.getContext('2d');
   mCanvasWidth = parseInt(canvas_elm.width);
   mCanvasHeight = parseInt(canvas_elm.height);
   mCanvasTop = parseInt(canvas_elm.top);
   mCanvasLeft = parseInt(canvas_elm.left);
   
   Event.observer('canvas', 'click', function(e) {
        if(!bIsGameRunning && !bIsGameOver) {
            bIsGameRunning = true;
            beginGame();
            step();
        }
   });
   preloadGameData();
});
