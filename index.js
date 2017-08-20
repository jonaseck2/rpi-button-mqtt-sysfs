var gpio = require('node-gpio');
var GPIO = gpio.GPIO;
var mqtt = require('mqtt')

var config = {
    'mqtt': {},
    'button': {}
}

config.mqtt.broker = process.env.MQTT_BROKER || 'mqtt://localhost:1883'
config.mqtt.prefix = process.env.MQTT_PREFIX || 'media'
config.mqtt.topic = process.env.MQTT_TOPIC || 'button'
config.mqtt.user = process.env.MQTT_USER
config.mqtt.password = process.env.MQTT_PASSWORD
config.button.channel = process.env.BUTTON_CHANNEL || '17'

var options = {}
if(config.mqtt.user) options.username = config.mqtt.user
if(config.mqtt.password) options.password = config.mqtt.password

var client  = mqtt.connect(config.mqtt.broker, options)
client.on('connect', function () {
  console.log("MQTT Connected")
});

var button = new GPIO(config.button.channel);
button.open();
button.setMode(gpio.IN);
button.write(gpio.LOW);

button.on("changed", function (value) {
  if(!value)
  client.publish(config.mqtt.prefix + '/' + config.mqtt.topic, 'pushed')
});
button.listen();

process.on('SIGINT', function () {
    button.close();
    client.end()
    process.exit();
})
