'use strict'
const mq        = require('ibmmq')
const colors    = require('colors')
require('dotenv').config()

const MQC       = mq.MQC
const qMgr      = process.env.QMGR          //  IBM MQ NAME
const qName     = process.env.QUEUE_NAME    //  QUEUE NAME

module.exports = { 
    publisnMessage: (req, res) => {
        const cno           = new mq.MQCNO()
        cno.Options         |= MQC.MQCNO_CLIENT_BINDING // use MQCNO_CLIENT_BINDING to connect as client
        const cd            = new mq.MQCD()
        cd.ConnectionName   = `${process.env.HOST}:${process.env.PORT}` //  EXP: 192.168.100.42:1414
        cd.ChannelName      = process.env.CHANNEL
        cno.ClientConn      = cd
        const csp           = new mq.MQCSP()
        csp.UserId          = "app"
        csp.Password        = "passw0rd"
        cno.SecurityParms   = csp

        mq.Connx(qMgr, cno, (err, hConn) => {
            if (err) console.log(colors.red("MQ CONNENCT ERROR ", err))
            else { console.log(colors.green(`MQ CONNENCT TO ${qMgr} SUCCESSFUL!`))
                const od        = new mq.MQOD()
                od.ObjectName   = qName
                od.ObjectType   = MQC.MQOT_Q
                let openOptions = MQC.MQOO_OUTPUT
                mq.Open(hConn, od, openOptions, (err, hObj) => {
                    if (err) console.log(colors.red("MQOPEN ERROR ", err))
                    else { //console.log(colors.green(`MQ OPEN OF ${qName} SUCCESSFUL!`))
                        putMessage(hObj)
                    }
                    cleanup(hConn, hObj)
                })
            }
        })
        res.status(200).send('OK')
    }
}

function toHexString(byteArray) { return byteArray.reduce((output, elem) => (output + ('0' + elem.toString(16)).slice(-2)), '') }
function putMessage(hObj) {
    const msg   = "HELLO IBM MQ " + new Date()
    const mqmd  = new mq.MQMD() // Defaults are fine.
    const pmo   = new mq.MQPMO()
    pmo.Options = MQC.MQPMO_NO_SYNCPOINT | MQC.MQPMO_NEW_MSG_ID | MQC.MQPMO_NEW_CORREL_ID
    mq.Put(hObj, mqmd, pmo, msg, (err) => {
        if (err) console.log(colors.red("PUT MESSAGE ", err))
        else console.log(colors.blue("MsgId: " + toHexString(mqmd.MsgId), "MQPUT successful"))
    })
}
function cleanup(hConn, hObj) {
    mq.Close(hObj, 0, (err) => {
        if (err) console.log(colors.red("CLEANUP ", err))
        //else console.log(colors.green("MQ CLOSE SUCCESSFUL!"))
        mq.Disc(hConn, (err) => {
            if (err) console.log(colors.red("MQ DISCONNECT ERROR ", err))
            else console.log(colors.green("MQ DISCONNECT SUCCESSFUL!"))
        })
    })
}
