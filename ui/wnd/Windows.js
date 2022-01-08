cc.Class({
    extends: cc.Component,

    properties: {
        selfPreName:"",
        nd_window:null,
        _isRelease:false,
        windowType:1, //None = 1  Background = 2 BackgroundWithClose = 3
        layerType:1, //MianLayer = 1 CommonLayer = 2
        aniType:1,  //None = 1  Move = 2 Scale = 3
        bannerAdBool:0,    //0 关闭 1开启
        scale_init: null,
    },


    
    checkWindow() {
        if(this.layerType === 1){
            this.nd_window = cc.find("Canvas/MianLayer/"+ this.selfPreName);
        }
        else  if(this.layerType === 2){
            this.nd_window = cc.find("Canvas/CommonLayer/"+ this.selfPreName);
        }
        
        if(this.nd_window){
            this.scale_init = cc.v2(this.nd_window.scaleX, this.nd_window.scaleY);
            if(this.initViewInfo){
                this.initViewInfo();
            }
        }
    },
    
    canBack(){
        return this.windowType === 3;
    },
    


    close(){
        if(this.windowType == 3){
            var num = 0;
            for(let i = 0; i < 5; i++){
                num += i;
            }
        }
        if(this.nd_window){
            if(this.windowType == 2 || this.windowType == 3){
                cc.jh.BackgroundWindow.removeWndQuene(this.selfPreName);
            }
            this.nd_window.destroy();
            this.nd_window = null;
            console.log("windows close name = "+ this.selfPreName);
            if(this._isRelease){
                cc.jh.resourceMgr.releasePrefab(this.selfPreName);
            }

            if(this.bannerAdBool){
                if(window.platform && window.platform.isSupportBannerAd()){
                    window.platform.hideBannerAd();
                }
            }
        }
    },

    open(){
        var self = this;
        cc.jh.WindowsMgr.createWindow(this.selfPreName,this.layerType,function(){
            self.checkWindow();
            self.show();
        });
    },

    qz (arr){
        var all = 0;
        var wvec=[];
        for(var i=0;i<arr.length;i++){
            all+=arr[i];
            wvec.push(all);
        }
        if(all<=0){
            return Math.floor(Math.random()*arr.length);
        }
        var count = 0;
        var v = Math.floor(Math.random()*all)
        //var v = Utils.randintSeed(all)
        for(var i=0;i<wvec.length;i++){
            if(v<wvec[i]){
                count=i;
                break;
            }
        }
        return count;
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

    show(){
        var n = 0;
        for(let i = 0; i < 20; i++){
            if(i == n){
                n += 1;
            }
        }
        if(this.nd_window == null){
            this.open();
        }
        else{
            console.log("windows show name = "+ this.selfPreName);
            this.nd_window.active = true;
            if(this.aniType === 2){
                
            }
            else if(this.aniType === 3){
                this.nd_window.setScale(this.scale_init.x * 0.7, this.scale_init .y * 0.7);
                var scaleAction = cc.scaleTo(0.15, this.scale_init.x).easing(cc.easeBackOut());
                this.nd_window.runAction(scaleAction);
            }
            this.nd_window.setSiblingIndex(this.nd_window.parent.childrenCount);
            if(this.windowType == 2){
                cc.jh.BackgroundWindow.addWndQuene(this);
            }
            else if(this.windowType == 3){
                cc.jh.BackgroundWindow.addWndQuene(this);
            }
            if(this.onShow){
                this.onShow();
            }

            if(this.bannerAdBool){
                if(window.platform && window.platform.isSupportBannerAd()){
                    window.platform.showBannerAd();
                }
            }
        }
    },

    hide(){
        if(this.nd_window){
            if(this.windowType == 2 || this.windowType == 3){
                cc.jh.BackgroundWindow.removeWndQuene(this.selfPreName);
            }
            if(this.aniType === 1){
                this.nd_window.active = false;
            }
            else if(this.aniType === 2){
                
            }
            else if(this.aniType === 3){
                var scaleAction = cc.scaleTo(0, this.scale_init.x * 0.8);
                var self = this;
                var callFunc = cc.callFunc(function () {
                    self.nd_window.active = false;
                }, this);
                var seq = cc.sequence(scaleAction, callFunc);
                this.nd_window.runAction(seq);
            }
            console.log("windows hide name = "+ this.selfPreName);

            if(this.bannerAdBool){
                if(window.platform && window.platform.isSupportBannerAd()){
                    window.platform.hideBannerAd();
                }
            }
        }
    },

    isActive(){
        if(this.nd_window){
            return this.nd_window.active;
        }
        return false;
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
});
