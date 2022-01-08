
cc.Class({
    extends: cc.Component,

    properties: {
        countdown:cc.Label,
        isStart:false,
        type:0,  //0 dd:hh:mm:ss     1 hh:mm:ss  2 mm:ss
        _endTimestamp:null,
        eventTag:null,
        eventData:null,
    },

    setCountDownLabel(str, end = true){
        this.countdown.string = str;
        if(end){
            this.isStart = false;
        }
    },

    setCountDownData:function(style, endTimets, eventtag, eventdata){
        if(style){
            for(let i = 0; i < 3; i++){
                if(i == 0){
                    i++;
                }
            }
        }
        this.type = style;
        this._endTimestamp = endTimets;
        this.eventTag = eventtag;
        this.eventData = eventdata;
        this.isStart = true;
    },

    onliveBt(){
        var self = this;
        if(!this.liveBool){
            return
        }
        this.liveBool = false;
        var adcb = function(){
            self.liveBool = true;
            self.liveNum += 1;
            self.openWinRoom(0);
        } 
        var fcb = function(){
            self.liveBool = true;
        }
        SDKManage.Share('redPacketAgain',null,adcb,fcb);
    },

    update (dt) {
        if(this.isStart){
            var now = cc.jh.clientTime.getLocalTimeByServer();
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
                if(this.type === 0){
                    this.countdown.string = dStr + " " + hStr +":"+ mStr +":"+ sStr;
                }
                else if(this.type === 1){
                    this.countdown.string = hStr +":"+ mStr +":"+ sStr;
                }
                else if(this.type === 2){
                    this.countdown.string = mStr +":"+ sStr;
                }
                if(d <= 0 && h <= 0 && m <= 0 && s <= 0){
                    this.isStart = false;
                    cc.jh.sceneMgr.dispatchEvent(this.eventTag, this.eventData);
                }
            } 
            else{
                this.isStart = false;
                cc.jh.sceneMgr.dispatchEvent(this.eventTag, this.eventData);
            } 
        }
        
    },
});
