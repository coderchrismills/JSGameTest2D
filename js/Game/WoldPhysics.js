function doCollisionTests(wold, context) {
    for (var c = world.m_contactList; c; c = m_next) {
        var contact1 = c.m_node1.contact;
        var contact2 = c.m_node2.contact;
        var body1 = c.m_shape1.m_body;
        var body2 = c.m_shape2.m_body;
         if(body1.GetUserData() != null && body2.GetUserData() != null) {
            var body1name = body1.GetUserData().name;
            var body1type = body1.GetUserData().bodyType;
            var body2name = body2.GetUserData().name;
            var body2type = body2.GetUserData().bodyType;
            
            if(body1name == GROUND_PLANE && body2type == CANNON_BALL) {
                
            }
            
            if(body1type == CANNON_BALL && body2type == BALLOON ||
               body2type == CANNON_BALL && body1type == BALLOON) {
                
                balloon.destroy();
            }
            
         }
    }
}