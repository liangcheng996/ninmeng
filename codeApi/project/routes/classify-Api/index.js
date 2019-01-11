var mongodb = require("mongodb-curd")
var dbbase = "ninmeng";
var dbcoll = "iconlist"; //所有分类
var dbClassifycoll = "classify";
var dbBilllistcoll = "billlist"
    //查找所有icon
var iconlist = function(req, res, next) {
        mongodb.find(dbbase, dbcoll, {}, function(result) {
            if (result.length > 0) {
                res.send({
                    code: 0,
                    message: "查询成功",
                    data: result
                })
            } else {
                res.send({
                    code: 1,
                    message: "失败",
                })
            }
        })
    }
    //添加分类接口
var addclassify = function(req, res, next) {
    var cname = req.body.cname;
    var iname = req.body.iname;
    var type = req.body.type;
    var uid = req.body.uid
    if (!cname || !iname || !type || !uid) {
        res.send({
            code: 2,
            message: "缺少参数"
        })
    } else {
        //判断分类是否存在
        getIsClassify()

    }

    function getIsClassify() {
        //$in  查询一个键下的多个值
        mongodb.find(dbbase, dbClassifycoll, { iname: iname, cname: cname, type: type, uid: { $in: ["*", uid] } }, function(result) {
            if (result.length > 0) {
                res.send({
                    code: 2,
                    message: "该分类已经存在"
                })
            } else {
                add() //添加分类
            }
        })
    }

    function add() {
        mongodb.insert(dbbase, dbClassifycoll, { cname: cname, iname: iname, type: type, uid: uid }, function(result) {
            if (result) {
                res.send({
                    code: 0,
                    message: "添加成功"
                })
            } else {
                res.send({
                    code: 1,
                    message: "添加失败"
                })
            }
        })
    }

}

//查询分类
var getclassify = function(req, res, next) {
    var type = req.body.type,
        uid = req.body.uid;
    mongodb.find(dbbase, dbClassifycoll, { type: type, uid: { $in: ["*", uid] } }, function(result) {
        if (result.length > 0) {
            res.send({
                code: 0,
                data: result
            })
        } else {
            res.send({
                code: 1,
                message: "没有查询到"
            })
        }
    })
}

module.exports = {
    iconlist: iconlist,
    addclassify: addclassify,
    getclassify: getclassify
}