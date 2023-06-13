/*
* (c) Copyright IBM Corporation 2018
*
* Licensed under the Apache License, Version 2.0 (the "License")
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict'
// Use the inbuilt HTTPS module. There are simplified alternatives,
// but this minimises the dependency list.
//var https=require('https')
import https        from 'https'
import dotenv       from 'dotenv'
import ConsoleLog   from '../services/ConsoleLog'
dotenv.config()

// All the admin REST calls start from this point
const apiBase   = "/ibmmq/rest/v1/"
const username  = process.env.MQ_USER    //  app
const password  = process.env.MQ_PASSWORD
const qMgr      = process.env.MQ_MGR
const queue     = process.env.QUEUE_NAME
const host      = `${process.env.MQ_HOST}`
const port      = `${process.env.MQ_PORT}`
const path      = apiBase + "messaging/qmgr/" + qMgr + "/queue/" + queue + "/message"

const options = {
  host, port, method: 'GET',
  headers: {
    'Authorization': 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64'),
    'Content-Type' : 'text/plain',
    // Need this header for POST operations even if it has no content
    'ibm-mq-rest-csrf-token' : ''
   },
   rejectUnauthorized: false,   //  ONLY FOR TEST
   path
}
//putMessage()

function putMessage() {
  options.method = 'POST'
  const msg     = "HELLO IBM MQ FROM TS APP " + new Date()
  const request = https.request(options, (response) => {
    ConsoleLog.info(`POST STATUSCODE: ${response.statusCode}`)
    response.setEncoding('utf8')
    response.on('data', (cbresponse) => { ConsoleLog.success(`POST RESPONSE: ${cbresponse}`) })
  })
  request.on('error', (e) => ConsoleLog.error(`PROBLEM WITH REQUEST: ${e}`))
  request.write(msg)
  request.end()

}

export default putMessage
