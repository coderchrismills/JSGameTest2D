/******************************************************************************/
function createGround(world) {
    var ground = new b2BoxDef();
    ground.extents.Set(WORLD_WIDTH_IN_PIXELS, 50);
    ground.restitution = 0.25;
    ground.friction = 0.2;
    
    var bodydef = new b2BodyDef();
    bodydef.AddShape(ground);
    bodydef.position.Set(0, 334);
    
    var userdataobj = new Object();
    userdataobj.name = GROUND_PLANE;
    userdataobj.bodyType = GROUND_PLANE;
    
    bodydef.userData = userdataobj;
    
    return world.CreateBody(bodydef);
}
/******************************************************************************/
function createBallWithRadius(world, x, y, radius) {
    var ball = new b2CircleDef();
    ball.density = 1.0;
    ball.radius = radius;
    ball.restitution = 1.0;
    ball.friction = 0.0;
    
    var bodydef = new b2BodyDef();
    bodydef.AddShape(ball);
    bodydef.position.Set(x,y);
    
    return world.CreateBody(bodydef);
}
/******************************************************************************/
function createBall(world, x, y) {
    return createBallWithRadius(world, x, y, 20.0);
}
/******************************************************************************/
function createBox(world, x, y, width, height, fixed, name, bullet_type) {
    if(typeof(fixed) == 'undefined') { fixed = true; }
    if(typeof(bullet_type) == 'undefined') { bullet_type = false; }
    
    var box = new b2BoxDef();
    if(!fixed) { box.density = 1.0; }
    box.extents.Set(width, height);
    
    var bodydef = new b2BodyDef();
    bodydef.AddShape(box);
    bodydef.position.Set(x, y);
    
    var userdataobj = new Object();
    userdataobj.name = name;
    userdataobj.bodyType = "Primitive_Box";
    
    bodydef.userData = userdataobj;
    
    return world.CreateBody(bodydef);
}
/******************************************************************************/
