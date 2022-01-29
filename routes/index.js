const express = require('express');
const router = express.Router();
const userRouter = require('./users')

/* GET home page. */
router.get('/', function(req, res) {
  res.json({
    message : "File upload-app is running good~",
    serverTime : Date.now()
  })
});

router.use("/users", userRouter)

module.exports = router;
