//添加账单
var dbbase = "ninmeng";
var dbusercoll = "user";
var dbclassifycoll = "classify";
var dbbilllistcoll = "billlist";


var billlist = function(req, res, next) {
    var type = req.body.type,
        money = req.body.money,
        icon = req.body.icon,
        name = req.body.name,
        time = req.body.time,
        uid = req.body.uid,
        cid = req.body.cid;
    //判断参数是否为空
    if (!type || !name || !icon || !time || !money || !uid || !cid) {
        res.send({
            code: 1,
            message: "参数不完整"
        })
    } else {
        //判断用户是否存在
        mongodb.find(dbbase, dbusercoll, { _id: uid }, function(result) {
            if (result.length > 0) {
                //判断分类是否存在
                isclassify();
            } else {
                res.send({
                    code: 1,
                    message: "用户不存在"
                })
            }

            function isclassify() {
                mongodb.find(dbbase, dbclassifycoll, { _id: cid }, function(result) {
                    if (result.length > 0) {
                        //分类存在，进行添加
                        add();
                    } else {
                        res.send({
                            code: 1,
                            message: "分类不存在"
                        })
                    }
                })
            }

            function add() {
                req.body.time = new Date(time);
                mongodb.insert(dbbase, dbbilllistcoll, req.body, function(result) {
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
        })
    }
}
var getbill = function(req, res, next) {
    var uid = req.query.uid,
        time = req.query.time, //时间  年2019   月2019-12
        name = req.query.name.split(",");
    //分类的名字
    if (!uid || !time || !name) {
        res.send({
            code: 1,
            message: "缺少参数"
        })
    } else {
        if (time.indexOf("-") != -1) { //判断是否为月份
            var timeArr = time.split("-");
            if (timeArr[1] == "12") {
                var maxTime = (timeArr[0] * 1 + 1) + "-01"
            } else {
                if (timeArr[1] < 10) { //月份小于10,需要补0
                    var maxTime = timeArr[0] + "-0" + (timeArr[1] * 1 + 1)
                } else {
                    var maxTime = timeArr[0] + "-" + (timeArr[1] * 1 + 1)
                }

            }
        } else { //按年
            var maxTime = time * 1 + 1 + "";
        }
        mongodb.find(dbbase, dbbilllistcoll, { time: { $lt: new Date(maxTime), $gte: new Date(time) }, uid: uid, name: { $in: name } }, function(result) {
            if (result.length > 0) {
                res.send({
                    code: 0,
                    message: "查找成功",
                    data: result
                })
            } else {
                res.send({
                    code: 1,
                    message: "查找失败"
                })
            }


        }, {
            time: 1
        })
    }

}
module.exports = {
    billlist: billlist,
    getbill: getbill
}