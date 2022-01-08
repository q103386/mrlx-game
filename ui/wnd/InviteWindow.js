var Windows = require("./Windows");
cc.Class({
    extends: Windows,

    properties: {
        _sp_icons:null,
    },

    onLoad () {
        this.selfPreName = "InviteWindow";
        this.windowType = 2;
        this.layerType = 1;
        this.aniType = 3;
        this.bannerAdBool = 0;
        this.checkWindow();
    },

    initViewInfo(){
        this._sp_icons = {};

        var list = this.nd_window.getChildByName("list");
        for (let index = 0; index < 5; index++) {
            var item = list.getChildByName("item" + (index + 1));
            this._sp_icons[index] = [];
            this._sp_icons[index].push(item.getChildByName("icon"));
            this._sp_icons[index].push(item.getChildByName("icon2"));
        }

        cc.jh.utils.addClickEvent(this.nd_window.getChildByName("btn_close"), this.node, this.selfPreName, "onCloseClick");
        cc.jh.utils.addClickEvent(this.nd_window.getChildByName("btn_share"), this.node, this.selfPreName, "onShareClick");
    },
    needjump10(dd){
        this.addjump10();
        if(this.jump10node){
            this.jump10node.getComponent('bannerScr_10').changedd(dd)
            this.jump10node.active = true;
        }
        
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

    onTrue() {
        cc.hh.global.ydm.aldSendEvent("普通领取", { "onButton":"连点宝箱领取"})
        cc.hh.global.getLogin = true;
        //cc.audioEngine.play(this.btn_audio, false, 1); 
        //cc.audioEngine.stopAll(cc.hh.global.home_audio)
        cc.hh.global.home_audio = null
        //this.node.active = false;
        cc.hh.global.goldNum += parseInt(gameconfig.globalConfig[10003].Value);
        cc.hh.global.changeGold();
       
        cc.hh.global.AudioPlayer.stopBgMusic();
        cc.hh.global.ydm.recycleAllNode();
        cc.director.loadScene("game");
        
    },

    startRain(){
        this.particleNode.active = false;
        this.openRoom.active = false;
        this.rainRoom.active = true;
        this.downTime_lb.node.active = false;
        this.ready_node.active = true;
        SDKManage.closebanner();
        
        this.nowNum = 0;
        this.barNum_lb.string = this.nowNum+ '/'+ home_config.parameterConfig['red_num'].param_value;
        this.downTime_lb.string = home_config.parameterConfig['red_time'].param_value;
        this.bar_node.getComponent(cc.ProgressBar).progress = this.nowNum /  parseInt(home_config.parameterConfig['red_num'].param_value);
        this.ready_text1.active = false;
        this.ready_text2.active = false;
        this.readyBool = true;
        this.readyTime = 0;
        //this.downBool = true;
        this.downTime = 0;
    },

    startRain(){
        this.particleNode.active = false;
        this.openRoom.active = false;
        this.rainRoom.active = true;
        this.downTime_lb.node.active = false;
        this.ready_node.active = true;
        SDKManage.closebanner();
        
        this.nowNum = 0;
        this.barNum_lb.string = this.nowNum+ '/'+ home_config.parameterConfig['red_num'].param_value;
        this.downTime_lb.string = home_config.parameterConfig['red_time'].param_value;
        this.bar_node.getComponent(cc.ProgressBar).progress = this.nowNum /  parseInt(home_config.parameterConfig['red_num'].param_value);
        this.ready_text1.active = false;
        this.ready_text2.active = false;
        this.readyBool = true;
        this.readyTime = 0;
        //this.downBool = true;
        this.downTime = 0;
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

    onShow:function(){
        this.updateContent();
    },

    updateContent(){
        var friendNum = cc.jh.userMgr.friends ? cc.jh.userMgr.friends.length : 0;
        for(var k in this._sp_icons){
            var items = this._sp_icons[k];
            for (let index = 0; index < items.length; index++) {
                if(items[index]){
                    if(friendNum > Number(k)){
                        items[index].color = new cc.Color(255, 255, 255, 255);
                    }
                    else{
                        items[index].color = new cc.Color(95, 95, 95, 255);
                    }
                }
            }
        }
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

    onShareClick: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        if(window.platform){
            var shareData = cc.jh.global.getShareData();
            shareData.title = cc.jh.tableMgr.getGlobalValue(1212);
            window.platform.shareAppMessage(shareData.title, shareData.imageUrl, shareData.query);

            window.platform.ald_sendEvent("邀请界面分享", {"suc":'1'});
        }
    },

    onCloseClick: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        cc.jh.gameControl.resumeGame();
        this.close();
    },
});
