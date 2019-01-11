var express = require('express');
var router = express.Router();
var classify = require("./classify-Api/index.js")
    /* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
//查找所有icon
router.get("/classify/iconlist", classify.iconlist);
//添加分类的接口
router.post("/classify/addclassify", classify.addclassify)
    //查询分类接口
router.post("/classify/getclassify", classify.getclassify)

module.exports = router;