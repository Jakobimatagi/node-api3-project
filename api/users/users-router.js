const express = require('express');
const router = express.Router();

// You will need `users-model.js` and `posts-model.js` both
const users = require("./users-model")
const post = require("../posts/posts-model");
const { validateUser, validateUserId } = require('../middleware/middleware');

// The middleware functions also need to be required




router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  
  users.get()
  .then((users) =>{
    res.status(200).json(users)
  }
  )
  .catch((err)=>{
    next(err)
  }
  )
  
});

router.get('/:id',validateUser() ,validateUserId(), (req, res, next) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  // users.getById(req.params.id)
	// 	.then((user) => {
	// 		if (user) {
  //               req.user = user
  //       res.json(user)
	// 			next()
	// 		} else {
	// 			res.status(404).json({
	// 				message: "User not found",
	// 			})
	// 		}
	// 	})
	// 	.catch((error) => {
	// 		console.log(error)
	// 		next(error)
	// 	})
    res.json(req.user)
});

router.post('/', validateUser(),(req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  users.insert(req.body)
    .then((user)=>{
      res.status(201).json(user)
    })
    .catch((err)=>{
      next(err)
    }
    )
});

router.put('/:id', validateUser(), validateUserId(),(req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  users.update(req.params.id, req.body)
  .then((user)=>{
    if(user){
      res.status(200).json(user)
    }else{
      res.status(404).json({
        message: "Error updating"
      })
    }
  })
  .catch((err)=>{
    next(err)
  })

});

router.delete('/:id', validateUserId(), (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  users.remove(req.params.id)
  .then((count)=>{
    if(count > 0){
      res.status(200).json({
        message: "The user has been deleted"
      })
    }else{
      res.status(404).json({
        message: "The user could not be found"
      })
    }
  })
  .catch((err)=>{
    next(err)
  })
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  


  
});

// do not forget to export the router
module.exports = router