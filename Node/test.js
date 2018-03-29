var debounce = require('debounce');
var serialport = require('serialport');
var readline = require('readline');
var xbox = require('xbox-controller-node');
var request = require('request');
var gamenumber = 2053;
var idPlayer = "";
var iphost = "172.31.28.177";
var http = require("http");
const fs = require('fs');

var portname = process.argv[2];

var myPort = new serialport(portname, {
	bauttRate: 9600,
	//parser:serialport.parsers.readline("\r\n")
})

let playerID;

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


myPort.on('open', onOpen);
myPort.on('data', onrecieveData);
myPort.on('error', showError);

rl.on('line', sendDataBluetooth);

function onOpen()
{
	console.log("Connection to Droid!");
}

function hit(){

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
	if(data == 'HIT')
	{
		 sendDataServer('/game/'+gamenumber+'/player/' + playerID + '/hit', 'POST');
	}
}

function sendDataBluetooth(data)
{
	console.log("Sending to Droid: " + data);
	myPort.write(data + "\n");
}

function sendDataServer(data, method)
{
	var url = iphost + data;
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
  sendDataBluetooth('5');
  console.log('a');

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
     /*
   fs.readFile('idplayer.txt', 'utf8', function(err, contents) {
    console.log(contents);
	idPlayer = contents;
	});


	var options = {
	  "method": "POST",
	  "hostname": ""+iphost+"",
	  "port": "3000",
	  "path": "/game/"+gamenumber+"/player/"+idPlayer+"/reconnect",
	  "headers": {
		"content-type": "application/json",
		"cache-control": "no-cache",

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
*/
	sendDataBluetooth('4');
}));

xbox.on('b',debounce( function () {
  console.log('b');

var options = {
    hostname: iphost,
    port: "3000",
    path: '/game/' + gamenumber + '/player/' + idPlayer + '/ammo',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
};
var req = http.request(options, function(res) {
    res.on('data', function(body) {
        console.log('GET ammo:');
        console.log('Body: ' + body);
    });
});
req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});
req.end();
}));



xbox.on('y', debounce(function(){
	console.log('y');
	var qs = require("querystring");

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

  
  fs = require('fs');
  fs.writeFile('idplayer.txt', ""+idPlayer+"", function (err) {
  if (err) return console.log(err);
  
    });
});
  
});

req.write(qs.stringify({ name: 'Android' }));
req.end();
}));

xbox.on('start',debounce( function () {
  sendDataServer('/game/0/player', 'POST');
  console.log('start');
}));

let state = 'stop';
xbox.on('leftstickLeft', function () {
  console.log('Moving [LEFTSTICK] LEFT');
  if(state !== 'left'){
	state = 'left';
	sendDataBluetooth('3');
  }
  
});

xbox.on('leftstickUp', function () {
  console.log('Moving [LEFTSTICK] UP');
  if(state !== 'up'){
    state = 'up';
	sendDataBluetooth('0');
  }
});

xbox.on('leftstickDown', function () {
  console.log('Moving [LEFTSTICK] DOWN');
  if(state !== 'down'){
	state = 'down';
	sendDataBluetooth('1');
  }
});

xbox.on('leftstickRight', function () {
  console.log('Moving [LEFTSTICK] RIGHT');
  if(state !== 'right'){
	state = 'right';
	sendDataBluetooth('2');
  }
});

