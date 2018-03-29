var debounce = require('debounce');
var serialport = require('serialport');
var xbox = require('xbox-controller-node');
var request = require('request');
var gamenumber = 2040;
var idPlayer;
var iphost = "172.31.28.177";

//var portname = process.argv[2];
/*
var myPort = new serialport(portname, {
	bauttRate: 115200,
	//parser:serialport.parsers.readline("\r\n")
})
*/
let playerID;

/*myPort.on('open', onOpen);
myPort.on('data', onrecieveData);
myPort.on('error', showError)*/

function onOpen()
{
	console.log("Connection to Droid!");
}

function hit(){
var http = require("http");

var options = {
  "method": "POST",
  "hostname": ""+iphost+"",
  "port": "3000",
  "path": "/game/"+gamenumber+"/player/"+idPlayer+"/hit",
  "headers": {
    "content-type": "application/json",
    "cache-control": "no-cache"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
}

function onrecieveData(data)
{
	console.log("Received data: " + data);
	if(data = 'HIT')
	{
		 sendDataServer('/game/0/player/' + playerID + '/hit', 'POST');
	}
}

function sendDataBluetooth(data)
{
	console.log("Sending to Droid: " + data);
	//myPort.write(data + "\n");
}

function sendDataServer(data, method)
{
	var url = 'http://localhost:3000' + data;
	// Set the headers
	var headers = {
		'User-Agent':       'Super Agent/0.0.1',
		'Content-Type':     'application/x-www-form-urlencoded'
	}

	// Configure the request
	var options = {
		url: url,
		method: method,
		headers: headers,
	}

	console.log(url);
	// Start the request
	/*request(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			// Print out the response body
			var obj = JSON.parse(body);

			if(obj.action == 'identifyPlayer')
			{
				playerID = obj.result.id;
			}
		}
	});*/
}

function showError(error)
{
   console.log('Serial port error: ' + error);
}

//use of the xbox gamepad instead of web cliënt controller
xbox.on('error', showError);

xbox.on('a',debounce( function () {
  sendDataBluetooth('f');
  console.log('a');
  var http = require("http");

var options = {
  "method": "POST",
  "hostname": ""+iphost+"",
  "port": "3000",
  "path": "/game/"+gamenumber+"/player/"+idPlayer+"/ammo",
  "headers": {
    "content-type": "application/json",
    "cache-control": "no-cache"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
}));

xbox.on('x',debounce( function () {
   console.log('x');
}));

xbox.on('b',debounce( function () {
  sendDataBluetooth('s');
  console.log('b');
  var http = require("http");

var options = {
  "method": "GET",
  "hostname": ""+iphost+"",
  "port": "3000",
  "path": "/game/"+gamenumber+"/player/"+idPlayer+"/ammo",
  "headers": {
    "content-type": "application/json",
    "cache-control": "no-cache"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(JSON.stringify({ username: 'Android' }));
req.end();
}));

xbox.on('y', debounce(function(){
	console.log('y');
	var qs = require("querystring");
var http = require("http");

var options = {
  "method": "POST",
  "hostname": ""+iphost+"",
  "port": "3000",
  "path": "/game/"+gamenumber+"/player/",
  "headers": {
    "content-type": "application/x-www-form-urlencoded",
    "cache-control": "no-cache"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
	var recv = JSON.parse(body);
	idPlayer = recv.result.id
        console.log(recv.result.id);
  });
});

req.write(qs.stringify({ name: 'Android' }));
req.end();
}));

xbox.on('start',debounce( function () {
  sendDataServer('/game/0/player', 'POST');
  console.log('start');
}));


xbox.on('leftstickLeft', function () {
  console.log('Moving [LEFTSTICK] LEFT');
});

xbox.on('leftstickUp', function () {
  console.log('Moving [LEFTSTICK] UP');
});

xbox.on('leftstickDown', function () {
  console.log('Moving [LEFTSTICK] DOWN');
});

xbox.on('leftstickRight', function () {
  console.log('Moving [LEFTSTICK] RIGHT');
});
