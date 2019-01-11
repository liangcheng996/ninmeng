var express = require('express');
var router = express.Router();
var billlist = require("./billlist-Api/index.js")

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

//添加账单
router.post("/bill/billlist", billlist.billlist)
router.get("/bill/getbill", billlist.getbill)


module.exports = router;