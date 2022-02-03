const env = process.env.NODE_ENV || 'development'

type CORS = {
  origin: string | string[]
  methods: string
  preflightContinue: boolean
  optionsSuccessStatus: number
}

type Config = {
  serverUrl: string
  serverPort: number
  serverDatabase: string
}

export const corsOptions: CORS = {
  origin: ['https://boo-dash-fe.herokuapp.com', 'http://localhost:3000'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
}

const config: Config = require(`./${env}`).default

export default config
