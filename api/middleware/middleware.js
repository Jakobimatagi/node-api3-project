const users = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
    const time = new Date().toISOString()
  
  if(req){
   console.log(`${req.ip} made a ${req.method} request to ${req.url} at ${time}`)
   next();
  }else if(!req){

    console.log("Error occured")
    return res.status(500).json({
      message: "Something went wrong"
    })
    
  }
  
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  users.getById(req.params.id)
  .then((user)=>{
    if(user){
      req.user = user
      next()
    } else {
      res.status(404).json({
        message: "user not found" 
      })
    }
  }
  )
  .catch((err)=>{
    next(err)
  })
}

// function validateUser(req, res, next) {
//   // DO YOUR MAGIC
//   if(!req.body.name){
//     return res.status(400).json({
//       message: "missing required name field"
//     })
//   }
//   console.log(req.body)
// }

// const validateUser = (req, res, next) => {
//   console.log(validateUser)

//   next()
// }

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  // validateUser,
  validatePost,
}
