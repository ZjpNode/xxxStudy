'use strict';

var http = require('http');

var options = {
	host: 'httpbin.org',
	path: '/post',
	method: 'POST',
	headers: {
	}
};

function postSate(state) {
	options.headers['Content-Length'] = state.length;
	var req = http.request(options,function (res) {
		res.on('data',function (chunk) {
			console.log('BODY: ' + chunk);
		});
	});
	req.write(state);
	req.end();
}

$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }

    $("#button").on('push',function () {
    	console.log('Button push');
		$('#led-r').turnOn(function () {
			postSate('turn on')
		});
	});

	$("#button").on('release',function () {
		console.log('Button release');
		$('#led-r').turnOff(function () {
			postSate('turn off')
		});
	});

});

$.end(function () {
    $('#led-r').turnOff();
});
