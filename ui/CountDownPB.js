
cc.Class({
    extends: cc.Component,

    properties: {
        _progress:null,
        _endTimestamp:null,
        _totalSeconds:0,
        eventTag:null,
        eventData:null,
        startBool:false,
        _callBack:null,
    },

    onLoad () {
        this._progress = this.node.getComponent(cc.ProgressBar);
    },

    knifeMove(p1,p2){
        var self = this;
        var cb =  cc.callFunc(function(target, score) {
            if(self.nd_knife){
                self.knifeMovebool = false;
                self.nd_knife.destroy();
            }          
        }, this, null)
        var action = cc.sequence(cc.moveTo(0.5, p2), cb);
        
        this.nd_knife.runAction(action);
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

    greatBlock(block, a) {
        if (block && a[0]) {
            block.moveTo(a[0].x, a[0].y);
            for (let i = 1; i < a.length; i++) {
                block.lineTo(a[i].x, a[i].y);
            }
            block.close();
            // block.length = 5;
            block.fillColor = cc.Color.BLOCK;

            block.fill();
            block.lineWidth = 3;          
            block.strokeColor = cc.Color.BLOCK;
            block.stroke();
        }
    },

    setCountDownData(endTimets, totalSeconds, eventtag, eventdata){
        this._endTimestamp = endTimets,
        this._totalSeconds = totalSeconds;
        this.eventTag = eventtag;
        this.eventData = eventdata;
        this.startBool = true;
        console.log("setCountDownPB--------------------totalSeconds>"+endTimets + ", totalSeconds" + totalSeconds);
    },
    
    update (dt) {
        if(this.startBool){
            var now = cc.jh.clientTime.getLocalTimeByServer();
            var lefttime = this._endTimestamp - now;
            this._progress.progress = (this._totalSeconds - lefttime) / this._totalSeconds;

            var d,h,m,s;  
            if (lefttime >=0) {  
                d = Math.floor(lefttime/60/60/24); 
                h = Math.floor(lefttime/60/60%24);  
                m = Math.floor(lefttime/60%60);  
                s = Math.floor(lefttime%60);   
            
                if(d <= 0 && h <= 0 && m <= 0 && s <= 0){
                    this.startBool = false;
                    cc.jh.sceneMgr.dispatchEvent(this.eventTag, this.eventData);
                }
            } 
            else{
                this.startBool = false;
                cc.jh.sceneMgr.dispatchEvent(this.eventTag, this.eventData);
            } 
        }
    },
});
