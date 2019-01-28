import express from 'express'
import swaggerui from 'swagger-ui-express'
import bodyParser from 'body-parser'
import * as swagger from 'swagger2'

import { postgresMiddleware } from './postgres'

import { routes as registerRoute } from './routes/register.js'



const app = express()
const router = express.Router()
app.use(bodyParser())

const spec = swagger.loadDocumentSync('./swagger.yaml')
if(!swagger.validateDocument(spec)) {
    throw Error('Invalid swagger file');
}

for(const routes of[
    registerRoute
])[
    routes(router)
]

app.use('/', swaggerui.serve)
app.get('/', swaggerui.setup(spec))

router.get('/swagger.json', (req, res) => {         //<---                                             
    res.send(spec)
})


app.use(postgresMiddleware())
app.use('/v1', router)       //<-- 'v1' is the basePath

app.listen(5000, () => {
    console.log('example runnning at port 5000')
})