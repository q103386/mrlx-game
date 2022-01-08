var Windows = require("./Windows");
cc.Class({
    extends: Windows,

    properties: {
        nd_tips_Content:null,
        _tipsPool:null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.selfPreName = "TipsWindow";
        this.windowType = 1;
        this.layerType = 2;
        this.checkWindow();
    },

    initViewInfo(){
        this.nd_tips_Content = this.nd_window.getChildByName("content");
        this.nd_window.removeChild(this.nd_tips_Content);

        this._tipsPool = new cc.NodePool();
        for (let i = 0; i < 1; ++i) {
            let res = cc.instantiate(this.nd_tips_Content); // 创建节点
            this._tipsPool.put(res); // 通过 putInPool 接口放入对象池
        }
    },

    openWinRoom(n){
        SDKManage.closebanner();
        this.winRoom.active = true;
        this.share_bt.active = false;
        this.open_bt.active = false;
        this.live_bt.active = false;
        this.item_node.active = false;
        this.hbShow_node.active = false;
        this.rmb_node.active = false;
        this.winHkx_text.active = false;
        this.winZdhd_text.active = false;
        this.winMrzl_text.active = false;
        this.winGx_text.active = true;
        if(n == 0){
            this.open_bt.active = true;
            this.hbShow_node.active = true;
        }
        if(n == 1){
            this.item_node.active = true;
            //this.liveNum += 1;
            if(this.liveNum < 1){
                this.live_bt.active = true;
            }else{
                this.share_bt.active = true;
            }
        }
        if(n == 2){
            this.rmb_node.active = true;
            this.share_bt.active = true;
        }
        if(n == 3){
            this.winGx_text.active = false;
            this.winHkx_text.active = true;
            this.winZdhd_text.active = true;
        }
        if(n == 4){
            this.winGx_text.active = false;
            this.winHkx_text.active = true;
            this.winMrzl_text.active = true;
        }
    },

    showTip(content, delayTime = 0.25){
        var res = this.getContentItem();
        res.setPosition(cc.v2(0,0));
        res.children[0].getComponent(cc.Label).string = content;
        res.opacity = 255;

        var endPos = cc.v2(0,100);
        var delay = cc.delayTime(delayTime);
        var moveTo1 = cc.moveTo(1, endPos);
        var fadeOut = cc.fadeOut(1.0);
        var self = this;
        var callFunc = cc.callFunc(function () {
            self._tipsPool.put(res);
        }, this);
        var spawn = cc.spawn(moveTo1,fadeOut);
        var seq = cc.sequence(delay, spawn,callFunc);
        res.runAction(seq);
    },

    addLine(p1,p2){
        //console.log("pos",p1,p2)
        //console.log("convertToNodeSpaceAR",)
        p1 = this.node.convertToNodeSpaceAR(p1)
        p2 = this.node.convertToNodeSpaceAR(p2)
        this.draw = this.node.getComponent(cc.Graphics);
        this.draw.clear();         
        this.draw.moveTo(p1.x, p1.y);
        this.draw.lineTo(p2.x, p2.y);
        this.draw.stroke();
    },

    getContentItem(){
        var res = null;
        if (this._tipsPool.size() > 0) {
            res = this._tipsPool.get();
        } else { 
            res = cc.instantiate(this.nd_tips_Content);
        }
        res.parent = this.nd_window;
        return res;
    },

   
});
