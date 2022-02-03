import 'module-alias/register'
import * as express from 'express'
import * as graphqlHTTP from 'express-graphql'
import * as cors from 'cors'

import schema from './graphql/schema'
import config from './config'

import { connectDb } from './db'

const app = express()
const expressPlayground =
  require('graphql-playground-middleware-express').default

connectDb()

app.use('/graphql', graphqlHTTP.graphqlHTTP({ schema, graphiql: true }))

// app.use(cors({ origin: '*' }))

app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

app.listen(config.serverPort, () => {
  console.log(`🚀 Server started on ${config.serverUrl}:${config.serverPort}`)
})

export default app
