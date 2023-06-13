import mqtt from "mqtt"

class MQTTService {
    //host: string
    topic: string
    message: string
    mqttClient: any
    messageCallback: any
    MQTT_HOST_NAME: string = "mqtt://192.168.100.42:1414"

    constructor(topic: string, message: string/*, host: string , messageCallback?: any */) {
        //this.host = host
        this.topic      = topic
        this.message    = message
        this.mqttClient = null
        //this.messageCallback = messageCallback
    }

    connect() {
        this.mqttClient = mqtt.connect(this.MQTT_HOST_NAME)
        // MQTT Callback for 'error' event
        this.mqttClient.on("error", (err: Error) => {
            console.log(err)
            this.mqttClient.end()
        })
        // MQTT Callback for 'connect' event
        this.mqttClient.on("connect", () => { console.log(`MQTT CLIENT CONNECTED`) })
        // Call the message callback function when message arrived
        this.mqttClient.on("message", function (topic: string, message: string) {
            console.log(message.toString())
            //if (this.messageCallback) this.messageCallback(topic, message)
        })
        this.publish(this.topic, this.message)

        this.mqttClient.on("close", () => { console.log(`MQTT client disconnected`) })

    }
    // Publish MQTT Message
    publish(topic: string, message: string) {
        this.mqttClient.publish(topic, message)
    }
    // Subscribe to MQTT Message
    /* subscribe(topic: string, options: any) {
        this.mqttClient.subscribe(topic, options)
    } */

}

export default MQTTService
/**
*   curl -i -k https://192.168.100.42:9443/ibmmq/rest/v1/messaging/qmgr/QM1/queue/DEV.QUEUE.1/message -X POST -u admin:passw0rd -H "ibm-mq-rest-csrf-token: blank" -H "Content-Type: text/plain;charset=utf-8" -d "Hello IBM MQ WITH CURL!"
*/