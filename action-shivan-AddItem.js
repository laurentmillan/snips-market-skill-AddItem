#! /usr/bin/env node

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost:1883')
var request = require('request');
var player = require('play-sound')(opts = {})

client.on('connect', function () {
  client.subscribe('hermes/hotword/+/detected')
  client.subscribe('hermes/intent/shivan:AddItem')
  client.subscribe('hermes/intent/shivan:SearchItem')
  client.subscribe('hermes/intent/shivan:ListItems')
  client.subscribe('hermes/intent/shivan:NumberItems')
})


var callback_AddItem = function(err, resp, body){
	// Ajoute x à la liste y
	console.log("*****\nAddItem", body);
}

var callback_SearchItem = function(err, resp, body){
	// Est-ce qu'il y a p dans la liste l ?
	console.log("*****\nSearchItem", body);
}

var callback_ListItems = function(err, resp, body){
	// Donne moi la liste l
	console.log("*****\nListItems", body);
}

var callback_NumberItems = function(err, resp, body){
	// Combien il y a de p dans la liste l
	console.log("*****\nNumberItems", body);
}

var lastIntentDetails;

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(topic)
  let intentDetails = JSON.parse(message.toString());
  console.log(intentDetails);
  lastIntentDetails = intentDetails;

  switch(topic){
	case "hermes/hotword/default/detected":
		player.play(__dirname + '/bip.wav', function(err){
		  if (err) throw err
		})
		break;
	case "hermes/intent/shivan:AddItem":
    callback_AddItem(req, res, body)
		//request.post(options, callback_AddItem);
		break;
	case "hermes/intent/shivan:SearchItem":
    callback_SearchItem(req, res, body)
		//request.post(options, callback_SearchItem);
		break;
	case "hermes/intent/shivan:ListItems":
    callback_ListItems(req, res, body)
		//request.post(options, callback_ListItems);
		break;
	case "hermes/intent/shivan:NumberItems":
    callback_NumberItems(req, res, body)
    //request.post(options, callback_NumberItems);
		break;
  }
})
