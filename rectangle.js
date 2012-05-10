var Rectangle = function(x, y, width, height) {
    var self = {};
    self.x = x;
    self.y = y;
    self.vxy = 0;
    self.width = width;
    self.height = height;

	self.right = function(right) {
		if (!right) {	return self.x + self.width;	}
		else {
			self.x = right - self.width;
			return self;
		}
	}
	self.bottom = function(bottom) {
		if (!bottom) {	return self.y + self.height;	}
		else {
			self.y = bottom - self.height;
			return self;
		}
	}

	self.left = function(left) {
		if (!left) {	return self.x;	}
		else {	
			self.x = left;
			return self;
		}
	}

	self.top = function(top) {
		if (!top) {	return self.y;	}
		else {
			self.y = top;
			return self;
		}
	}

	self.centerXY = function(cxy) {
		if (!cxy){
			return { x: (self.left() + self.right())/2, 
					 y: (self.bottom() + self.top())/2 };
		}
		else{
			self.x = cxy.x - self.width/2;
			self.y = cxy.y - self.height/2;
			return self;
		}
	}

	self.speed = function(vxy){
		if (!vxy) {
			return self.vxy;
		}
		else {
			self.vxy = vxy;
		}
	}

	self.position = function(pos) {
		if (!pos) {	return {x: self.x, y: self.y};	}
		else {
			self.x = pos.x;
			self.y = pos.y;
		}
	}

	self.move = function() {
		var cxy = self.centerXY();
		cxy.x += self.vxy.x *3;
		cxy.y += self.vxy.y *3;
		//console.log(cxy.x + "" + cxy.y);
		self.centerXY(cxy);
	}

	self.intersect = function(that) {
		var my_cxy  = self.centerXY();
		var that_cxy = that.centerXY();
		if( Math.abs(my_cxy.x - that_cxy.x) < Math.max( self.width, that.width) &&
			Math.abs(my_cxy.y - that_cxy.y) < Math.max( self.height, that.height)) {
			return true;
		}
		return false;
	}


    return self;
}
