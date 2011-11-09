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
   Cannon.rotationStep  = 5;
   Cannon.fireRate      = 500;
   
   function render(world, context) {
      
   };
   
   function fire() {
      
   };
   
   function rotate(delta) {
      
   }
   
   
});