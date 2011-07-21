(function(global){
	
	function Tasks() {
		if (!(this instanceof Tasks)) {
			return new Tasks();
		}
		return this;
	}

	Tasks.prototype = {
		_listeners: {},
		_tasks: [],
		_isReady: true,
		
		add: function add(name, fn) {
			
			if (!name) {
				throw new Error('When adding a task it needs to be named!');
			}
			
			if (!fn) {
				throw new Error('Missing the actual task function!');
			}
			
			this._isReady = false;
			
			this._tasks.push(fn);
			
			var self = this,
				done = function done() {
					var args = Array.prototype.slice.call(arguments),
						// TODO: Add a fix for legacy IE's missing array.indexOf
						i = self._tasks.indexOf(fn); 
						
					self._tasks.splice(i, 1);
					
					self.trigger.apply(self, [ 'task' ].concat(args));
					
					self.trigger.apply(self, [ 'task:' + name ].concat(args));
					
					if (self._tasks.length === 0) {
						self._ready = true;
						self.trigger('ready');
					}
				};
			
			fn(done);
		},
		ready: function ready(fn) {
			if (this._ready) {
				setTimeout(fn, 0);
			} else {
				this.bind('ready', fn);
			}
			
			return this;
		},
		trigger: function trigger() {
			
			var args = Array.prototype.slice.call(arguments),
				name = args.shift(),
				listeners,
				listener,
				len,
				i;
				
			if (this._listeners.hasOwnProperty(name)) {
				listeners = this._listeners[name].slice();
				for (i = 0, len = listeners.length; i < len; i++) {
					listener = listeners[i];
					listener.apply(this, args);
				}
			}
			
			return this;
		},
		unbind: function unbind(name, fn) {
			
			var i;
			
			if (this._listeners.hasOwnProperty(name)) {
				if (fn) {
					// TODO: Add a fix for legacy IE's missing array.indexOf
					i = this._listeners[name].indexOf(fn);
					if (i !== -1) {
						this._listeners[name].splice(i, 1);
					}
				} else {
					delete this._listeners[name];
				}
			}
			
			return this;
		},
		bind: function bind() {
			
			var args = Array.prototype.slice.call(arguments),
				name = args.shift(),
				fn = args.shift();
				
			if (!this._listeners.hasOwnProperty(name)) {
				this._listeners[name] = [];
			}
			
			// TODO: Allow for passing of default/additional
			// arguemnts to the event handler
			this._listeners[name].push(fn);
			
			return this;
		}
	};
	
	global.Tasks = Tasks;
	
}(this));