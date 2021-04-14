// require your server and launch it
const server = require("./api/server")

const port = 4040

server.listen(port, ()=>{
    console.log(`Sever is running on port ${port}`)
})