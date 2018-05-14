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


client.on('message', function (topic, message) {
  // message is Buffer
  console.log(topic)
  let intentDetails = JSON.parse(message.toString());
  console.log(intentDetails);
  lastIntentDetails = intentDetails;
});
