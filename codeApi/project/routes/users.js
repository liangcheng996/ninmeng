var express = require('express');
var router = express.Router();
mongodb = require("mongodb-curd")
var dbbase = "ninmeng";
var dbcoll = "user"
    /* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
//添加用户信息
router.post("/users/adduser", function(req, res, next) {
    var name = req.body.name
    mongodb.insert(dbbase, dbcoll, { name: name }, function(result) {
        if (result) {
            res.send({
                code: 0,
                message: "success"
            })
        } else {
            res.send({
                code: 0,
                message: "失败"
            })
        }
    })

})

module.exports = router;