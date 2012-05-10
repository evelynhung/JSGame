var ObjectQueue = function (){
    var self = {};
    var queue = [];
	
	self.get_queue = function() {
		return queue;
	}
	self.push = function(obj){
		queue.push(obj);
	}

	self.update = function(obj){
		queue.forEach(function(ele) { ele.update(); });
	}

	self.draw = function(actorQueue){
		queue.forEach(function(ele) { ele.draw() });
	}

	self.detectIntersection = function(thatQueue, autoRemove){
		autoRemove = autoRemove ? true :autoRemove;
		var intersections = [];
		for( var i = 0; i < queue.length; ++i){
			var my_actor = queue[i];
			var that_queue = thatQueue.get_queue();
			for( var j = 0; j < that_queue.length; ++j){
				var that_actor = that_queue[j];
				if( my_actor.intersect(that_actor)){
					intersections.push([my_actor, that_actor]);
				}
			}
		}
		return intersections;
	}
    return self;
}

