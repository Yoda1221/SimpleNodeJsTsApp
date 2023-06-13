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
var https=require('https')

// All the admin REST calls start from this point
const apiBase   = "/ibmmq/rest/v1/"
const username  = "app"
const password  = "passw0rd"
const qMgr      = "QM1"
const queue     = "DEV.QUEUE.1"
const host      = "QM1"
const port      = "9443"
const path      = apiBase + "messaging/qmgr/" + qMgr + "/queue/" + queue + "/message"

const options = {
  host, port, method: 'POST',
  headers: {
    'Authorization': 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64'),
    'Content-Type' : 'text/plain;charset=utf-8',
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
    console.info(`POST STATUSCODE: ${response.statusCode}`)
    response.setEncoding('utf8')
    response.on('data', (cbresponse) => { console.log(`POST RESPONSE: ${cbresponse}`) })
  })
  request.on('error', (e) => console.log(`PROBLEM WITH REQUEST: ${e}`))
  request.write(msg)
  request.end()
}

putMessage()