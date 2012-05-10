var Actor = function(spec) {
    var self = {};

	/* private Member */
	var my_status = tm.status.init;

	var width = spec.name.length * spec.font_size;
	var height = spec.font_size;

	var draw_init = function() { /* default: do nothing */ }

	/* Public Member */
    self.name = spec.name;
    self.font = spec.font_size + "px " + spec.font;
    self.font_color = spec.font_color;
    self.occupation = Rectangle(spec.x, spec.y, width, height);
	self.draw_method = [draw_init, draw_init, draw_init, draw_init];
    self.weapon_queue = ObjectQueue();

	/* Public Method */
    self.draw = function() {
		self.draw_method[my_status]();
	}

	self.centerXY = function() {
		return self.occupation.centerXY();
	}

	self.move = function() {
		self.occupation.move();
	}

	self.intersect = function(that) {
		return self.occupation.intersect(that.occupation);
	}

	self.position = function(pos) {
		if (!pos) { return self.occupation.position(); }
		else {	self.occupation.position(pos); }
	}

	self.speed = function(aSpeed) {
		if (!aSpeed) {	return self.occupation.speed();	}
		else {	self.occupation.speed(aSpeed);	}
	}

	self.status = function(aStatus) {
		if (!aStatus) {	return my_status;	}
		else {
			my_status = aStatus;
		}
	}

	self.speed(spec.speed);

    return self;
}


var Hero = function(context, spec) {
	var self = Actor(spec);

	var createWeapon = function() {
	    var w_spec = {
			name: "喵",
			font: "Calibri",
			font_size: 40,
			font_color: "#FC8",
			x: self.centerXY().x,
			y: self.centerXY().y,
			speed: { x: 1, y: 0 }
		}
    	var aWeapon = Weapon(context, w_spec);
		return aWeapon;
	}

	self.draw_method[tm.status.alive] = function() {
        context.save();
        context.translate(self.position().x, self.position().y);
        context.font = self.font;
        context.fillStyle = self.font_color;
        context.fillText(self.name, 0, 0);
        context.restore();
	}

    self.accept_keyboard = function(event){
        if (event.type === tm.event.release){
			if (event.code == tm.event.space) {
				return;
			}

            fill_vec(event);

            var speed = self.speed();
            var new_speed = { x: speed.x ^ event.vec.x, y: speed.y ^ event.vec.y };
            self.speed(new_speed);
            return;
        }

        if (event.type === tm.event.down){
			if (event.code == tm.event.space) {
				var weapon = createWeapon();
				self.weapon_queue.push(weapon);
				return;
			}

            fill_vec(event)

            var speed = self.speed();
            var new_speed = { x: speed.x | event.vec.x, y: speed.y | event.vec.y };
            self.speed(new_speed);
            return;
        }
    }
    self.update = function() {
		self.move();
	}

	self.status(tm.status.alive);
	return self;
}

