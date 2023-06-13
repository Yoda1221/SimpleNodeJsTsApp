//import { callbackify } from 'util';
import MQTTService from '../services/MQTTService'

// Change this to point to your MQTT broker
const topic: string = `${process.env.QMGR}`
const message = "MQTT MESSAGE"

const publishToMq = () => {
    var mqttClient = new MQTTService(topic, message/* , MQTT_HOST_NAME */)
    mqttClient.connect()
    /* exports.getPublisherPage = async function (req: any, res: any) {
        try {res.render("pages/publisher");} 
        catch (error: ) {return res.status(400).json({ status: 400, message: error.message })}
    }
    exports.publishMQTTMessage = async function (/* req: any, res: any * /) {
        try {
            console.log(`Request Topic :: ${topic}, Request Message :: ${message}`)
            mqttClient.publish(topic, message, {})
            console.log("Sucessfully published MQTT Message")
        } catch (error: any) { return console.log('PUBLISH ERROR ', error.message) }
    } */
}

export default publishToMq
