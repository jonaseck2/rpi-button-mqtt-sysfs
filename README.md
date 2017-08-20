# rpi-button-mqtt

publishes an mqtt message when a button is pushed

```
docker run -it \
-e MQTT_BROKER=mqtt://localhost:1883 \
-e MQTT_PREFIX=media \
-e MQTT_TOPIC=button \
-e MQTT_USER=homeassistant \
-e MQTT_PASSWORD=password \
-e BUTTON_CHANNEL=17 \
--privileged \
--net host \
jonaseck/rpi-button-mqtt-sysfs
```
