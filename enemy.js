var Enemy = function(context, spec) {
	var self = Actor(spec);
    var angle = 0;

    self.draw_method[tm.status.alive] = function() {
        context.save();
        context.translate(self.position().x, self.position().y);
        context.font = self.font;
        context.fillStyle = self.font_color;
        context.fillText(self.name, 0, 0);
        context.restore();
    }

    self.draw_method[tm.status.bump] = function() {
        context.save();

        context.translate(self.position().x, self.position().y);  // move far away

        context.rotate(angle* Math.PI/180);  // rotate
        context.translate(-0.5 * self.position().width, -0.5 * self.position().height); //Move To Center
        context.font = self.font;
        context.fillStyle = "#CCC";
        context.fillText("啊～", 0, 0);
        context.restore();
    }

    self.setHero = function(hero) {
        self.hero = hero;
    }

    self.update = function() {
		if (!self.hero){ }
		if (self.status() == tm.status.alive) {
			var _x_diff = self.hero.position().x - self.position().x ;
			var _y_diff = self.hero.position().y - self.position().y ;
			
			var new_x = self.position().x + (((Math.abs(_x_diff)/2) > 1)? _x_diff/Math.abs(_x_diff)*1 : _x_diff%1);
			var new_y = self.position().y + (((Math.abs(_y_diff)/2) > 1)? _y_diff/Math.abs(_y_diff)*1 : _y_diff%1);	
			var pos = {x: new_x, y: new_y }
			self.position(pos);
		}
		if(self.status() == tm.status.bump) {
			angle +=10;
			if( angle > 360 ) {
				self.status(tm.status.die);

			}
		}
    }
	self.status(tm.status.alive);
    return self;
}
