function Weapon(context, spec){
    var self = Actor(spec);
	var direction = { x: 1, y: 0 };
	var alpha = 1.0;

    self.draw_method[tm.status.alive] = function() {
		var speed = self.speed();
		var new_speed = { x: speed.x | direction.x, y: speed.y | direction.y };
		self.speed(new_speed);
		self.move();
        context.save();
        context.translate(self.position().x, self.position().y);
        context.font = self.font;
        context.fillStyle = self.font_color;
        context.fillText(self.name, 0, 0);
        context.restore();
    }

	self.draw_method[tm.status.bump] = function() {
        context.save();

        context.translate(self.position().x, self.position().y);
        context.font = self.font;
		context.fillStyle = "rgba(255, 0, 0, " + alpha + ")";
        context.fillText("掰", 0, 0);
        context.restore();

		alpha -= 0.05;
		if (alpha == 0) {
			self.status(tm.status.die);
		}
	}

    self.update = function() {
	}
	
	self.status(tm.status.alive);

    return self;
}
