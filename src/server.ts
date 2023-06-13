import express, { Express, Request, Response } from "express"
import chalk            from 'chalk'
import DateFormatting   from './services/DateFormatting'
import dotenv           from 'dotenv'

import publishToMq from './mq/mqPublisher'
import putMessage from './mq/httpRequest'

dotenv.config()
const PORT = process.env.PORT || 4500

const app: Express = express()
app.use(express.json)
app.use(express.urlencoded({ extended: true }))

app.get("/", (req: Request, res: Response) => {
  res.send("SIMPPLE NODEJS APP WITH TS")
})


//publishToMq()
putMessage()

app.listen(PORT, () => {
    console.log(chalk.whiteBright(`\n
    ${chalk.yellowBright('\t⎛  _  ⎞')}\tSNODE JS APP WITH TS\t
    ${chalk.yellowBright('\t⎟=(_)=⎢')}\t${chalk.cyan("RUNNING ON PORT: ", PORT)}\t
    ${chalk.yellowBright('\t⎝     ⎠')}\t${chalk.gray(DateFormatting.mediumDateTimeNumeric())}
    \t==============================\n`))
})

