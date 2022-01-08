
cc.Class({
    extends: cc.Component,

    properties: {
        countdown:cc.Sprite,
        countdownlabel:cc.Label,
        startBool:false,
        _endTimestamp:null,
        _totalTimestamp:null,
        eventTag:null,
        eventData:null,
    },

    setCountDownRange(range, end = true, showtxt = ""){
        this.countdown.fillRange = range;
        if(end){
            this.startBool = false;
        }
        this.countdownlabel.string = showtxt;
    },

    setCountDownData:function(endTimets, totaltime, eventtag, eventdata){
        this._endTimestamp = endTimets;
        this._totalTimestamp = totaltime;
        this.eventTag = eventtag;
        this.eventData = eventdata;
        this.startBool = true;
    },

    update (dt) {
        if(this.startBool){
            var now = cc.jh.clientTime.getLocalTimeByServer();
            var range =(this._endTimestamp - now) / this._totalTimestamp;
            this.countdown.fillRange = range;
            if(range <= 0){
                this.startBool = false;
                cc.jh.sceneMgr.dispatchEvent(this.eventTag, this.eventData);
                if(this.countdownlabel){
                    this.countdownlabel.string = "";
                }
            }
            else{
                if(this.countdownlabel != null){
                    var lefttime = (this._endTimestamp - now) / 1000;
                    var d,h,m,s;  
                    if (lefttime >=0) {  
                        d = Math.floor(lefttime/60/60/24); 
                        h = Math.floor(lefttime/60/60%24);  
                        m = Math.floor(lefttime/60%60);  
                        s = Math.floor(lefttime%60);   
                        
                        var dStr,hStr,mStr,sStr;
                        if(d < 10){
                            dStr = "0" + d;
                        }
                        else{
                            dStr = d;
                        }
                        if(h < 10){
                            hStr = "0" + h;
                        }
                        else{
                            hStr = h;
                        }
                        if(m < 10){
                            mStr = "0" + m;
                        }
                        else{
                            mStr = m;
                        }
                        if(s < 10){
                            sStr = "0" + s;
                        }
                        else{
                            sStr = s;
                        }
                        this.countdownlabel.string = mStr +":"+ sStr;
                    } 
                }
            }
        }
        
    },
});
