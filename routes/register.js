import { postgres } from '../postgres.js'
import { insert, retrieve, retrieveAll, update } from '../models/register'

export function routes(router){
    router
        .post('/register', async (req, res) => {
            console.log(req.body)
            const {name, address, password} = req.body
            const id = await insert(postgres(req), name, address, password)
            res.send(id[0].id)
        })
        .get('/register',async(req, res) => {
            const users = await retrieveAll(postgres(req))
            res.send(users)
        })
        .get('/register/id',async(req, res) => {
            const {name, address, password} = req.body
            const user = await retrieve(postgres(req), req.params.id)
            res.send(users[0])
        })
        .put('/register/id',async(req, res) => {
            const {name, password, address} = req.body
            const id = await retrieve(postgres(req), name, password, address, req.params.id)
            res.send(id)
        })
        .delete('/register/id',async(req, res) => {
            const {name, password, address} = req.body
            const id = await drop(postgres(req), name, password, address, req.params.id)
            res.send(id) // add status code and message not name etc.
        })


}