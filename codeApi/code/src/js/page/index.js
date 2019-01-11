window.onload = function() {
    var nianBtn = document.querySelector(".nianBtn")
    var timeBtn = document.querySelector(".timeBtn")
    var nowYear = new Date().getFullYear();
    var nowMonth = new Date().getMonth() + 1;
    var years = document.querySelector(".years");
    var photos = this.document.querySelector(".photos")
    var months = this.document.querySelector(".months")
    nowMonth = nowMonth < 10 ? "0" + nowMonth : nowMonth;
    timeBtn.innerHTML = nowYear + "-" + nowMonth;
    var picker = new mui.PopPicker();
    var dtPicker = new mui.DtPicker({ type: "month" });
    //年月选择
    nianBtn.addEventListener("tap", function() {
            picker.setData([{ value: 'month', text: '月' }, { value: 'year', text: '年' }]);
            var titleY = document.querySelector('[data-id=title-y]')
            var titleM = document.querySelector('[data-id=title-m]')
            var pickerY = document.querySelector('[data-id=picker-y]')
            var pickerM = document.querySelector('[data-id=picker-m]')
            picker.show(function(selectItems) {
                if (selectItems[0].text == "年") {
                    timeBtn.innerHTML = nowYear;
                    nianBtn.innerHTML = "年";
                    titleM.style.display = "none";
                    pickerM.style.display = "none";
                    titleY.style.width = "100%";
                    pickerY.style.width = "100%";
                } else {
                    nowMonth = nowMonth * 1 < 10 ? "0" + nowMonth * 1 : nowMonth;
                    nianBtn.innerHTML = "月";
                    timeBtn.innerHTML = nowYear + "-" + nowMonth;
                    titleM.style.display = "inline-block";
                    pickerM.style.display = "inline-block";
                    titleY.style.width = "50%";
                    pickerY.style.width = "50%";
                }
                //根据年月切换数据详情
                if (selectItems[0].text == "年") {
                    years.style.display = "block";
                    months.style.display = "none";
                } else {
                    years.style.display = "none";
                    months.style.display = "block";
                }
            })


        })
        //详细日期选择
    timeBtn.addEventListener("tap", function() {

            dtPicker.show(function(selectItems) {
                if (nianBtn.innerHTML == "年") {
                    timeBtn.innerHTML = selectItems.y.text;
                } else {
                    selectItems.m.text = selectItems.m.text * 1 < 10 ? "-0" + selectItems.m.text * 1 : selectItems.m.text
                    timeBtn.innerHTML = selectItems.y.text + selectItems.m.text;
                }
                // console.log(selectItems.y); //{text: "2016",value: 2016} 
                // console.log(selectItems.m); //{text: "05",value: "05"} 
            })
        })
        // var BScroll = new BScroll(".content")
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    // var titleP = document.querySelector(".title-p")
    //账单图表切换
    mui(".title-p").on("tap", "span", function() {
            if (this.innerHTML == "账单") {
                months.style.display = "block";
                photos.style.display = "none";
                this.classList.add("title-span")
                this.nextElementSibling.classList.remove("title-span")
            } else {
                this.classList.add("title-span")
                this.previousElementSibling.classList.remove("title-span")
                months.style.display = "none";
                photos.style.display = "block"
            }
        })
        //侧边栏

    var paylist = Array.from(document.querySelectorAll(".pay span"));
    var payBtn = this.document.querySelector(".pay-btn");
    var incomelist = Array.from(document.querySelectorAll(".income span"));
    var incomeBtn = this.document.querySelector(".income-btn");
    var elseBtn = this.document.querySelector(".else");
    var elselist = Array.from(document.querySelectorAll(".else-list span"));
    var clear = document.querySelector(".clear");
    //收支类型
    mui(".PItype").on("tap", "span", function() {
            if (this.classList.contains("type-span")) {
                this.classList.remove("type-span")
            } else {
                this.classList.add("type-span")
            }
        })
        //点击全部支出
    payBtn.addEventListener("tap", function() {
            if (this.classList.contains("type-span")) {
                paylist.map(function(v) {
                    v.classList.remove("type-span")
                })
            } else {
                paylist.map(function(v) {
                    v.classList.add("type-span")
                })
            }
        })
        //点击全部收入
    incomeBtn.addEventListener("tap", function() {
            if (this.classList.contains("type-span")) {
                incomelist.map(function(v) {
                    v.classList.remove("type-span")
                })
            } else {
                incomelist.map(function(v) {
                    v.classList.add("type-span")
                })
            }
        })
        //点击全部其他
    elseBtn.addEventListener("tap", function() {
            if (this.classList.contains("type-span")) {
                elselist.map(function(v) {
                    v.classList.remove("type-span")
                })
            } else {
                elselist.map(function(v) {
                    v.classList.add("type-span")
                })
            }
        })
        //点击全部支出的每一项
    mui(".pay").on("tap", "span", function() {
            if (this.classList.contains("type-span")) {
                this.classList.remove("type-span")
            } else {
                this.classList.add("type-span")
            }
            var length = paylist.length;
            var len = Array.from(document.querySelectorAll(".pay .type-span")).length;
            if (len == length) {
                payBtn.classList.add("type-span")
            } else {
                payBtn.classList.remove("type-span")
            }

        })
        //点击全部收入的每一项
    mui(".income").on("tap", "span", function() {
            if (this.classList.contains("type-span")) {
                this.classList.remove("type-span")
            } else {
                this.classList.add("type-span")
            }
            var length = incomelist.length;
            var len = Array.from(document.querySelectorAll(".income .type-span")).length;
            if (len == length) {
                incomeBtn.classList.add("type-span")
            } else {
                incomeBtn.classList.remove("type-span")
            }

        })
        //点击圈子的每一项
    mui(".quan").on("tap", "span", function() {
            if (this.classList.contains("type-span")) {
                this.classList.remove("type-span")
            } else {
                this.classList.add("type-span")
            }
            var length = elselist.length;
            var len = Array.from(document.querySelectorAll(".else-list .type-span")).length;
            if (len == length) {
                elseBtn.classList.add("type-span")
            } else {
                elseBtn.classList.remove("type-span")
            }
        })
        //点击重置

    clear.addEventListener("tap", function() {
        paylist.map(function(v) {
            v.classList.remove("type-span")
        })
        incomelist.map(function(v) {
            v.classList.remove("type-span")
        })
        elselist.map(function(v) {
            v.classList.remove("type-span")
        })
        payBtn.classList.remove("type-span")
        incomeBtn.classList.remove("type-span")
        elseBtn.classList.remove("type-span")
    })
}