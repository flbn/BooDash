type Config = {
  baseUrl: string
}

const dev: string = 'http://localhost:5000/graphql'
const prod: string = 'https://boo-dash.herokuapp.com/graphql'

const config: Config = {
  baseUrl: process.env.NODE_ENV === 'development' ? dev : prod,
}

export default config