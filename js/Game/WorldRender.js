function drawWorld(world, context) {
    
    for (var j = world.m_jointList; j; j = j.m_next) {
        drawJoint(j, context);
     }
     
    for (var b = world.m_bodyList; b; b = b.m_next) {
        var bodyname;
        var bodytype;
        var x;
        var y;
        if( b.GetUserData != null) {
            bodyname = b.GetUserData().name;
            bodytype = b.GetUserData().bodyType;
            x = GetOriginPosition().x;
            y = GetOriginPosition().y;
        }
        
        if(debugOptionEnabled("DrawPhysics")) {
            var context_stroke_color;
            var context_line_width = 0.5;
            var brown_stroke_color = '#663300';
            var yellow_stroke_color = '#ff0000';
            var black_stroke_color = '#000000';
            
            if( bodyname == BALLOON) {
                context_stroke_color = yellow_stroke_color;
                context_line_width = 3.0;
            }
            else if( bodyname == WALL || bodyname == GROUND_PLANE) {
                context_stroke_color = black_stroke_color;
                context_line_width = 1.0;
            }
            else if( bodyname == CANNON_BALL) {
                context_stroke_color = yellow_stroke_color;
                context_line_width = 0.5;
            }
            else {
                context_stroke_color = brown_stroke_color;
                context_line_width = 3.0;
            }
            
            for (var s = b.GetShapeList(); s != null; s = s.GetNext()) {
                drawShape(s, context, context_stroke_color, context_line_width);
            }
        }
        
        if(bodytype == CANNON) {
            b.render(world, context, x, y);
        }
        else if(bodytype == BALLOON) {
            b.render(world, context, x, y);
        }
        else if(bodytype == CANNON_BALL) {
            b.render(world, context, x, y);
        }
        else if(bodytype == WALL) {
            b.render(world, context, x, y);
        }
    }
}
/******************************************************************************/
function drawJoint(joint, context) {
    var b1 = joint.m_body1;
    var b2 = joint.m_body2;
    var x1 = b1.m_position;
    var x2 = b2.m_position;
    var p1 = joint.GetAnchor1();
    var p2 = joint.GetAnchor2();
    context.strokeStyle = '#00eeee';
    context.beginPath();
    
    if(joint.m_type == b2Joint.e_distanceJoint) {
        context.moveTo(p1.x, p1.y);
        context.lineTo(p2.x, p2.y)
    }
    else if(b1 == world.m_groundBody) {
        context.moveTo(p1.x, p1.y);
        context.lineTo(x2.x, x2.y);
    }
    else if(b2 == world.m_groundBody) {
        context.moveTo(p1.x, p1.y);
        context.lineTo(x1.x, x1.y);
    }
    else {
        context.moveTo(x1.x, x1.y);
        context.lineTo(p1.x, p1.y);
        context.lineTo(x2.x, x2.y);
        context.lineTo(p2.x, p2.y);
    }
    context.stroke();
}
/******************************************************************************/
function drawShape(shape, context, stroke_color, context_line_width) {
    
    context.strokeStyle = stroke_color;
    context.lineWidth = context_line_width;
    context.beginPath();
    
    switch (shape.m_type) {
        case b2Shape.e_circleShape : {
            var circle = shape;
            var pos = circle.m_position;
            var r = circle.m_radius;
            var segments = 16.0;
            var theta = 0.0;
            var dtheta = 2.0 * Math.PI / segments;
            
            context.moveTo(pos.x + r, pos.y);
            var i = 0;
            for( ; i< segments; i++) {
                var d = new b2Vec2(r *Math.cos(theta), r * Math.sin(theta));
                var v = b2Math.AddVV(pos, d);
                context.lineTo(v.x, v.y);
                theta += dtheta;
            }
            context.lineTo(pos.x + r, pos.y);
            
            context.moveTo(pos.x, pos.y);
            var ax = circle.m_R.col1;
            var pos2 = new b2Vec2(pos.x + r * ax.x, pos.y + r *ax.y);
            context.lineTo(pos2.x, pos2.y);
            break;
        }
        case b2Shape.e_polyShape : {
            var poly = shape;
            var tv = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[0]));
            if ( !isNaN(tv.x) && !isNaN(tv.y) ) {
				context.moveTo(tv.x, tv.y);
                var i = 0;
				for ( ; i < poly.m_vertexCount; i++) {
					var v = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[i]));
					context.lineTo(v.x, v.y);
				}
				context.lineTo(tv.x, tv.y);
			}
            break;
        }
    }
    context.stroke();
}
/******************************************************************************/
