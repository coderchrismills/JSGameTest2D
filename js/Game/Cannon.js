(function(window) {
   
   function Cannon() {
        this.initialize();
   }
   Cannon.prototype = new Container();
   
   Cannon.MIN_ANGLE     = 0;
   Cannon.MAX_ANGLE     = Math.Pi / 2;
   Cannon.MAX_POWER     = 10;
   Cannon.Position.x    = 10;
   Cannon.Position.y    = 400;
   Cannon.Size.width    = 50;
   Cannon.Size.height   = 50;
   Cannon.rotationStep  = 5;
   Cannon.fireRate      = 500;
   
   Cannon.prototype.cannonBody = null;
   
   Cannon.prototype.Container_initialize = Cannon.prototype.initialize;
   
   Cannon.prototype.initialize = function() {
      this.Container_initialize();
      
      this.cannonBody = new Shape();
      this.addChild(this.cannonBody);
      this.makeShape();
   }
   
   
   Cannon.prototype.render = function(world, context) {
      
   }
   
   Cannon.prototype.fire = function() {
      
   }
   
   Cannon.prototype.rotate = function(delta) {
      
   }
   
   Cannon.prototype.create = function(world, x, y, name) {
      var bodydef = new b2BoxDef();
      bodydef.friction = 0.2;
      bodydef.groupIndex = -2;
      
      var userdata = {};
      userdata.name = CANNON;
      
      bodydef.userData = userdata;
      
      bodydef.density = 1.0;
      bodydef.extents.Set(this.Size.witdth, this.Size.height);
      
      return world.CreateBody(bodydef);
   }
window.mCannon = Cannon;
}(window));