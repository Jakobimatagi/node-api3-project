const express = require('express');
const { logger } = require('./middleware/middleware');
const userRouter = require('./users/users-router')
const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(logger)
server.use(express.json())
server.use("/api", userRouter)
// global middlewares and the user's router need to be connected here

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


server.use((err, req, res, next)=>{
  console.log(err)

  res.status(500).json({
    message: "Something went wrong"
  })
})
module.exports = server;
