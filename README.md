=== Tasks ===

	var tasks = new Tasks();

	tasks.ready(function onReady(){
		console.log('ready', arguments);
	});

	tasks.bind('task', function onTask(){
		console.log('task', arguments);
	});

	tasks.add('loop', function asyncTask(done){
		var i,
			x,
			y;
	
		for (i = 0; i < 1000; i++) {
			for (x = 0; x < 1000; x++) {
				for (y = 0; y < 1000; y++) {
				
				}
			}
		}
	
		done(i, x, y);
	});

	tasks.add('async', function asyncTask(done){
		setTimeout(done, 3000);
	});

	tasks.bind('task:async', function onTask(){
		console.log('task:async', arguments);
	});