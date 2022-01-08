cc.Class({
    extends: cc.Component,

    properties: {
       _isStop:true,
    },

    // 震屏效果
    // 参数：duration 震屏时间
    shakeEffect: function (duration) {
        if(!this._isStop){
            return;
        }
        this._isStop = false;
        this.node.runAction(
            cc.repeatForever(
                cc.sequence(
                    cc.moveTo(0.02, cc.v2(5, 7)),
                    cc.moveTo(0.02, cc.v2(-6, 7)),
                    cc.moveTo(0.02, cc.v2(-13, 3)),
                    cc.moveTo(0.02, cc.v2(3, -6)),
                    cc.moveTo(0.02, cc.v2(-5, 5)),
                    cc.moveTo(0.02, cc.v2(2, -8)),
                    cc.moveTo(0.02, cc.v2(-8, -10)),
                    cc.moveTo(0.02, cc.v2(3, 10)),
                    cc.moveTo(0.02, cc.v2(0, 0))
                )
            )
        );

        var self = this;
        setTimeout(() => {
            self._isStop = true;
            self.node.stopAllActions();
            self.node.setPosition(0,0);
        }, duration*1000);
        
    },

    stopShakeEffectEffect(){
        this._isStop = true;
        this.node.stopAllActions();
        this.node.setPosition(0,0);
    }

});
