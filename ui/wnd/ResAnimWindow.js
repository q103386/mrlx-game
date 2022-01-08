var Windows = require("./Windows");
cc.Class({
    extends: Windows,

    properties: {
        _sp_resIcon:null,
        _resPool:null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.selfPreName = "ResAnimWindow";
        this.windowType = 1;
        this.layerType = 2;
        this.checkWindow();
    },

    initViewInfo(){
        this._sp_resIcon = this.nd_window.getChildByName("res");
        this.nd_window.removeChild(this._sp_resIcon);

        this._resPool = new cc.NodePool();
        for (let i = 0; i < 5; ++i) {
            let res = cc.instantiate(this._sp_resIcon); 
            this._resPool.put(res); 
        }

        this.initEventHandlers();
    },

    initEventHandlers:function(){
        var self = this;

        this.node.on('res_anim',function(data){
            var pos = data.beginpos;
            var num = data.animnum;
            var resid = data.resid;
            var scale = data.scale;
            for (let j = 0; j < num; ++j) {
                self.createResAnimation(pos, scale, resid, j);
            }
        });

        this.node.on('res_anim2',function(data){
            var pos = data.beginpos;
            var resid = data.resid;
            var scale = data.scale;
            var num = data.animnum;
            var angle = 360 / num;
            
            for (let j = 0; j < num; ++j) {
                var dis = cc.jh.utils.getRandom(150,250);
                self.createResAnimation2(pos, cc.jh.utils.forwardPos(pos, j*angle, dis), scale, resid, j);
            }
        });
    },

    onShuaXin(event,customEventData){
        //  console.log("this.live_bool = ",this.live_bool)
          var self = this;
          if(!self.live_bool){
              self.live_bool = true;
              this.btType = parseInt(customEventData);
            //  console.log("this.btType = ",this.btType)
          
              if(this.btType == 1){
              
                  
                  var adcb = function(){
                      
                      self.shuaXinShopInfo();
                      self.live_bool = false;
                  }
                  var fcb = function(){
                      self.live_bool = false;
                  }
                  SDKManage.Share('shopReno',null,adcb,fcb);
  
              }
              if(this.btType == 2){
                  var adcb = function(){
                      self.shuaXinShopInfo();
                      self.live_bool = false;            
                  }
                  var fcb = function(){
                      self.live_bool = false;
                  }
                  SDKManage.Share('shopShareReflash',null,adcb,fcb);
              
              }
              if(this.btType == 3){
                  self.shuaXinShopInfo();
                  self.live_bool = false;
              }   
          }
          
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

    
    getResPool: function () {
        var res = null;
        if (this._resPool.size() > 0) { 
            res = this._resPool.get();
        } else { 
            res = cc.instantiate(this._sp_resIcon);
            this._resPool.put(res);
            res = this._resPool.get();
        }
        return res;
    },

    createResAnimation2(beginPos, steppos, scale, resid, index = 0){
        var res = this.getResPool();
        res.parent = this.nd_window;
        res.active = true;
        res.scaleX = scale;
        res.scaleY = scale;
        res.opacity = 0;
        var endPos = null;
        if(resid === 1000){
            res.getComponent(cc.Sprite).spriteFrame = cc.jh.spriteMgr.getCommonIocn("icon_coin_1");
            endPos = cc.jh.mainWnd.getCoinsPos();
        }
        res.setPosition(beginPos);
        var moveto = cc.moveTo(0.2, steppos);
        var bezier = cc.jh.utils.getRadmonBezierPos(steppos, endPos);
        var bezierTo = cc.bezierTo(0.7, bezier).easing(cc.easeInOut(1.0));
        var scaleAction = cc.scaleTo(0.3, 0.3);
        var self = this;
        var callFunc = cc.callFunc(function () {
            self._resPool.put(res);
        }, this);
        var seq = cc.spawn(
            cc.fadeTo(0.1, 255),
            cc.sequence(moveto, bezierTo, callFunc),
            cc.sequence(cc.delayTime(0.4), scaleAction)
        );
        res.runAction(seq);
    },


    createSystemAnim(sprite, beginpos, endpos, scale){
        var res = this.getResPool();
        res.parent = this.nd_window;
        res.getComponent(cc.Sprite).spriteFrame = sprite;
        res.setScale(scale);
        res.setPosition(beginpos);
        var moveto = cc.moveTo(0.5, endpos);
        var self = this;
        var callFunc = cc.callFunc(function () {
            self._resPool.put(res);
        }, this);
        var seq = cc.spawn(
            cc.scaleTo(0.5, 1),
            cc.sequence(moveto, callFunc)
        )
        res.runAction(seq);
    },

    createAttrAnim(sprite, beginpos, endpos, scale){
        var res = this.getResPool();
        res.parent = this.nd_window;
        res.getComponent(cc.Sprite).spriteFrame = sprite;
        res.setScale(scale);
        res.setPosition(beginpos);
        var moveto = cc.moveTo(0.5, endpos);
        var self = this;
        var callFunc = cc.callFunc(function () {
            self._resPool.put(res);
            cc.jh.gameControl.node.getChildByName("droopshop").getComponent(cc.Animation).play('ani_armyshop');
        }, this);
        var seq = cc.sequence(
            cc.scaleTo(0.2, 1.5), 
            cc.delayTime(0.2),
            moveto, 
            callFunc)
        res.runAction(seq);
    },

    createResAnimation: function (beginPos, scale, resid, index = 0) {
        var res = this.getResPool();
        res.parent = this.nd_window;
        res.active = true;
        res.scaleX = scale;
        res.scaleY = scale;
        res.opacity = 0;
        var endPos = null;
        if(resid === 1000){
            res.getComponent(cc.Sprite).spriteFrame = cc.jh.spriteMgr.getCommonIocn("icon_coin_1");
            endPos = cc.jh.mainWnd.getCoinsPos();
        }
        res.setPosition(beginPos);

        var bezier = cc.jh.utils.getRadmonBezierPos(beginPos, endPos);
        var bezierTo = cc.bezierTo(0.7, bezier).easing(cc.easeInOut(1.0));
        var scaleAction = cc.scaleTo(0.3, 0.3);
        var delayAction = cc.delayTime(0.1 * index);
        var self = this;
        var callFunc = cc.callFunc(function () {
            self._resPool.put(res);
        }, this);
        var seq = cc.spawn(
            cc.sequence(delayAction, cc.fadeTo(0.1, 255)),
            cc.sequence(delayAction, bezierTo, callFunc),
            cc.sequence(delayAction, cc.delayTime(0.4), scaleAction)
        );
        res.runAction(seq);
    },
});
