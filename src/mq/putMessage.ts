import * as mq  from "ibmmq"
import dotenv   from 'dotenv'
dotenv.config()

const MQC   = mq.MQC
let qMgr    = `${process.env.QMGR}`
let qName   = `${process.env.QUEUE}`

function toHexString(byteArray: Buffer) {
    return byteArray.reduce((output, elem) => output + ("0" + elem.toString(16)).slice(-2), "")
}

function putMessage(hObj: mq.MQObject) {
    const mqmd    = new mq.MQMD() // Defaults are fine.
    const pmo     = new mq.MQPMO()
    const msg     = "Hello from Node at " + new Date().toString()

    pmo.Options = [ MQC.MQPMO_NO_SYNCPOINT, MQC.MQPMO_NEW_MSG_ID, MQC.MQPMO_NEW_CORREL_ID]
    mq.Put(hObj, mqmd, pmo, msg, (err) => {
        if (err) console.log('PUT ERROR ', err)
        else console.log("MsgId: " + toHexString(mqmd.MsgId), "MQPUT successful")
    })
}

function cleanup(hConn: mq.MQQueueManager, hObj: mq.MQObject) {
    mq.Close(hObj, 0, (closeErr) => {
        if (closeErr) console.log(closeErr)
        else console.log("MQCLOSE successful")
        mq.Disc(hConn, (discErr) => {
            if (discErr) console.log(discErr)
            else console.log("MQDISC successful")
        })
    })
}

const putMsgToMq = () => {
    console.log("Sample AMQSPUT.TS start")
    const cno: any          = new mq.MQCNO()
        cno.Options         |= MQC.MQCNO_CLIENT_BINDING // use MQCNO_CLIENT_BINDING to connect as client
        const cd: any       = new mq.MQCD()
        cd.ConnectionName   = `${process.env.HOST}:${process.env.PORT}`
        cd.ChannelName      = `${process.env.CHANNEL}`
        cno.ClientConn      = cd
    const csp               = new mq.MQCSP()
        csp.UserId          = "app"
        csp.Password        = "passw0rd"
        cno.SecurityParms   = csp
    mq.Connx(qMgr, cno, (connErr, hConn) => {
        if (connErr) console.log('EEE', connErr)
        else {
            console.log("MQCONN to %s successful ", qMgr)
            const od        = new mq.MQOD()
            od.ObjectName   = qName
            od.ObjectType   = MQC.MQOT_Q
            const openOptions = MQC.MQOO_OUTPUT
            mq.Open(hConn, od, openOptions, (openErr, hObj) => {
                if (openErr) console.log(openErr)
                else {
                    console.log("MQOPEN of %s successful", qName)
                    putMessage(hObj)
                }
                cleanup(hConn, hObj)
            })
        }
    })
}

export default putMsgToMq
