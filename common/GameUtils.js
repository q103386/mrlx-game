String.prototype.format = function (args) {
    if (arguments.length > 0) {
        var result = this;
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                var reg = new RegExp("({" + key + "})", "g");
                result = result.replace(reg, args[key]);
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] == undefined) {
                    return "";
                }
                else {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
        return result;
    }
    else {
        return this;
    }
};

cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    addClickEvent: function (node, target, component, handler) {
        //console.log(node.name + ":" + component + ":" + handler);
        var eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;

        var button = node.getComponent(cc.Button);
        if (button == null) {
            button = node.addComponent(cc.Button);
            button.transition = cc.Button.Transition.NONE;
        }

        button.interactable = true;
        var clickEvents = button.clickEvents;
        clickEvents.push(eventHandler);
    },

    addSlideEvent: function (node, target, component, handler) {
        var eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;

        var slideEvents = node.getComponent(cc.Slider).slideEvents;
        slideEvents.push(eventHandler);
    },

    addToggleEvent: function (node, target, component, handler) {
        var eventHandler = new cc.Component.EventHandler();
        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;

        var clickEvents = node.getComponent(cc.Toggle).clickEvents;
        clickEvents.push(eventHandler);
    },

    
    forwardPos(beginpos, angle, dis){
        //var radian = (angle * Math.PI) / 180;
        var radian = ((angle - 270) * Math.PI) / 180;
        var endpos = cc.v2(0,0);
        endpos.x = beginpos.x + dis * Math.cos(radian);
        endpos.y = beginpos.y + dis * Math.sin(radian);
        return endpos;
    },

    getTargetPosByLocal: function (target, self) {
        var pos1 = target.convertToWorldSpaceAR(cc.v2(0, 0));
        var pos2 = self.parent.convertToNodeSpaceAR(pos1);
        return pos2;
    },


    getBezierPos: function (startPoint, endPoint) {
        var sx = Math.abs(startPoint.x);
        var ex = Math.abs(endPoint.x);
        var xRatio = sx < ex ? 1.55 : 0.25;
        var centerPoint = cc.v2(startPoint.x + (endPoint.x - startPoint.x) * xRatio, startPoint.y + (endPoint.y - startPoint.y) * 0.7); //控制点 
        // var xRatio = (2.4 + Math.random() * 0.3)
        // var yRatio = (0.4 + Math.random() * 0.3)
        // var centerPoint = cc.v2(startPoint.x * xRatio, startPoint.y + (endPoint.y - startPoint.y) * yRatio);
        return [startPoint, centerPoint, endPoint];
    },

    getRadmonBezierPos: function (startPoint, endPoint) {
        var xRatio = (0.25 + Math.random() * 0.65) * 1.5
        var yRatio = (0.25 + Math.random() * 0.65) * 1.5
        var centerPoint = cc.v2(startPoint.x + (endPoint.x - startPoint.x) * xRatio, startPoint.y + (endPoint.y - startPoint.y) * yRatio); //控制点 
        return [startPoint, centerPoint, endPoint];
    },

    setGray: function (node, isGray) {
        var sprite = node.getComponent(cc.Sprite);
        if(sprite){
            if(isGray){
                sprite.setState(1);
            }
            else{
                sprite.setState(0);
            }
        }
    },

    shuffleArray: function (array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    },

    //深拷贝
    deepCopy: function (p, c) {
        var c = c || {};
        for (var i in p) {
            if (typeof p[i] === 'object') {
                c[i] = (p[i] != null && p[i].constructor === Array) ? [] : {};
                this.deepCopy(p[i], c[i]);
            } else {
                c[i] = p[i];
            }
        }
        return c;
    },

    isPositiveInteger: function (s) {//是否为正整数
        var re = /^[0-9]+$/;
        return re.test(s)
    },

    getTimestamp: function () {
        var time = Date.parse(new Date()).toString();
        return time.substr(0, 10);
    },

    //randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
    randomWord: function (randomFlag, min, max) {
        var str = "";
        var range = min;
        var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        // 随机产生
        if (randomFlag) {
            range = Math.round(Math.random() * (max - min)) + min;
        }
        for (var i = 0; i < range; i++) {
            var pos = Math.round(Math.random() * (arr.length - 1));
            str += arr[pos];
        }
        return str;
    },

    getLocalTime: function (timestamp) {
        var newDate = new Date();
        newDate.setTime(timestamp * 1000);
        return newDate;
    },

    dateFormat: function (date, type) {
        var datetime = "";
        if (type == 0) {
            datetime = "{0}-{1}-{2} {3}:{4}:{5}";
        }
        else if (type == 1) {
            datetime = "{0}-{1}-{2}";
        }
        else if (type == 2) {
            datetime = "{0}:{1}:{2}";
        }
        else if (type == 3) {
            datetime = "{0}.{1}.{2} {3}:{4}:{5}";
        }
        else if (type == 4) {
            datetime = "{0}:{1}";
        }
        else if (type == 5) {
            datetime = "{0}-{1} {2}:{3}";
        }
        else if (type == 6) {
            datetime = "{0}-{1}";
        }
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = month >= 10 ? month : ("0" + month);
        var day = date.getDate();
        day = day >= 10 ? day : ("0" + day);
        var h = date.getHours();
        h = h >= 10 ? h : ("0" + h);
        var m = date.getMinutes();
        m = m >= 10 ? m : ("0" + m);
        var s = date.getSeconds();
        s = s >= 10 ? s : ("0" + s);
        if (type == 0) {
            datetime = datetime.format(year, month, day, h, m, s);
        }
        else if (type == 1) {
            datetime = datetime.format(year, month, day);
        }
        else if (type == 2) {
            datetime = datetime.format(h, m, s);
        }
        else if (type == 3) {
            datetime = datetime.format(year, month, day, h, m, s);
        }
        else if (type == 4) {
            datetime = datetime.format(h, m);
        }
        else if (type == 5) {
            datetime = datetime.format(month, day, h, m);
        }
        else if (type == 6) {
            datetime = datetime.format(month, day);
        }
        return datetime;
    },

    dateFormatByTamp: function (timestamp, type) {
        var date = new Date(timestamp * 1000);
        return this.dateFormat(date, type);
    },

    setDateTime: function (date, time) {
        var times = time.split(':');
        var curTime = date;
        if (times && times.length >= 3) {
            curTime.setHours(times[0]);
            curTime.setMinutes(times[1]);
            curTime.setSeconds(times[2]);
        }
        return curTime;
    },

    getTodayDate: function (timestr) {
        var datas = timestr.split(':');
        var curTime = new Date();
        if (datas && datas.length >= 3) {
            curTime.setHours(datas[0]);
            curTime.setMinutes(datas[1]);
            curTime.setSeconds(datas[2]);
        }
        return curTime;
    },

    getLastTimeStr(timestamp) {
        if (timestamp == 0) {
            return "未玩过游戏";
        }

        var byTime = [365 * 24 * 60 * 60 * 1000, 24 * 60 * 60 * 1000, 60 * 60 * 1000, 60 * 1000, 1000];
        var unit = ["年", "天", "时", "分", "秒"];
        var ct = new Date().getTime() - timestamp;
        if (ct < 0) {
            return "";
        }

        var sb = [];
        for (var i = 0; i < byTime.length; i++) {
            if (ct < byTime[i]) {
                continue;
            }
            var temp = Math.floor(ct / byTime[i]);
            ct = ct % byTime[i];
            if (temp > 0) {
                sb.push(temp + unit[i]);
            }
            /*一下控制最多输出几个时间单位： 
                一个时间单位如：N分钟前 
                两个时间单位如：M分钟N秒前 
                三个时间单位如：M年N分钟X秒前 
            以此类推 
            */
            if (sb.length >= 2) {
                break;
            }
        }
        return sb.join('') + "前";
    },

    getCenterPos(tlGridPos, brGridPos) {
        return cc.v2(tlGridPos.x + (brGridPos.x - tlGridPos.x) / 2, tlGridPos.y - (tlGridPos.y - brGridPos.y) / 2);
    },

     //获取n-m之间的随机数，包含n不包含m
    getRandomNumber(begin, end) {
        var num = Math.floor(Math.random() * (end - begin) + begin);
        return num;
    },

    //获取n-m之间的随机数，包含n和m
    getRandom(begin, end) {
        var num = Math.round(Math.random() * (end - begin) + begin);
        return num;
    },

    numberFormat(number){
        if(number < 10000){
			return number.toString();
		}
		else if(number < 1000000){
			return (number / 1000).toFixed(1) + "K";
        }
        else if(number < 1000000000){
			return (number / 1000000).toFixed(1) + "M"; 
        }
        else if(number < 1000000000000){
			return (number / 1000000000).toFixed(1) + "B"; 
        }
        else if(number < 1000000000000000){
			return (number / 1000000000000).toFixed(1) + "T";
        }
        else if(number < 1000000000000000000){
			return (number / 1000000000000000).toFixed(1) + "AA";
        }
        else if(number < 1000000000000000000000){
			return (number / 1000000000000000000).toFixed(1) + "AB";
        }
        else if(number < 1000000000000000000000000){
			return (number / 1000000000000000000000).toFixed(1) + "AC";
        }
        else if(number < 1000000000000000000000000000){
			return (number / 1000000000000000000000000).toFixed(1) + "AD";
		}
		else{
			return (number / 1000000000000000000000000000).toFixed(1) + "AE"; 
		}
    },

    numberFormat2(number, fixed){
        if(number < 10000){
			return number.toString();
		}
		else if(number < 1000000){
			return (number / 1000).toFixed(fixed) + "K";
        }
        else if(number < 1000000000){
			return (number / 1000000).toFixed(fixed) + "M"; 
        }
        else if(number < 1000000000000){
			return (number / 1000000000).toFixed(fixed) + "B"; 
        }
        else if(number < 1000000000000000){
			return (number / 1000000000000).toFixed(fixed) + "T";
        }
        else if(number < 1000000000000000000){
			return (number / 1000000000000000).toFixed(fixed) + "AA";
        }
        else if(number < 1000000000000000000000){
			return (number / 1000000000000000000).toFixed(fixed) + "AB";
        }
        else if(number < 1000000000000000000000000){
			return (number / 1000000000000000000000).toFixed(fixed) + "AC";
        }
        else if(number < 1000000000000000000000000000){
			return (number / 1000000000000000000000000).toFixed(fixed) + "AD";
		}
		else{
			return (number / 1000000000000000000000000000).toFixed(fixed) + "AE"; 
		}
    },

    lineCrossPoint(a, b, c, d) {
        //线段ab的法线N1 
        var nx1 = (b.y - a.y), ny1 = (a.x - b.x);
        //线段cd的法线N2 
        var nx2 = (d.y - c.y), ny2 = (c.x - d.x);

        //两条法线做叉乘, 如果结果为0, 说明线段ab和线段cd平行或共线,不相交 
        var denominator = nx1 * ny2 - ny1 * nx2;
        if (denominator == 0) {
            return false;
        }

        var k0 = (b.y - a.y) / (b.x - a.x);
        // console.log(k0) ;
        var e = (b.y - k0 * b.x);
        // console.log(e) ;
        var k1 = (d.y - c.y) / (d.x - c.x);
        // console.log(k1) ;
        var e1 = (d.y - k1 * d.x);
        // console.log(e1) ;
        var x = (e1 - e) / (k0 - k1);
        var y = k0 * x + e;
        // console.log('交点横坐标'+x);
        // console.log('交点纵坐标'+y) ;
        return cc.v2((e1 - e) / (k0 - k1), k0 * x + e);
    },

    urlParse: function () {
        var params = {};
        if (window.location == null) {
            return params;
        }
        var name, value;
        var str = window.location.href; //取得整个地址栏
        var num = str.indexOf("?")
        str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

        var arr = str.split("&"); //各个参数放到数组里
        for (var i = 0; i < arr.length; i++) {
            num = arr[i].indexOf("=");
            if (num > 0) {
                name = arr[i].substring(0, num);
                value = arr[i].substr(num + 1);
                params[name] = value;
            }
        }
        return params;
    },
});