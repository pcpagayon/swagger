export function routes(router){
    router
        .post('/register', async (req, res) => {
            console.log(req.body)
            res.send('user is registered')
        })
}