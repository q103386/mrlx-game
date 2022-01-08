var Windows = require("./Windows");
cc.Class({
    extends: Windows,

    properties: {
        
    },

    onLoad () {
        this.selfPreName = "GuanzhuWindow";
        this.windowType = 2;
        this.layerType = 1;
        this.aniType = 3;
        this.bannerAdBool = 0;
        this.checkWindow();
    },

    initViewInfo(){
        cc.jh.utils.addClickEvent(this.nd_window.getChildByName("btn_back"), this.node, this.selfPreName, "onBackClick");
        cc.jh.utils.addClickEvent(this.nd_window.getChildByName("btn_copy"), this.node, this.selfPreName, "onCopyClick");
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

    onShow:function(){
        this.updateContent();
    },

    updateContent(){
        if(cc.jh.QRcode){
            this.nd_window.getChildByName("erweima").active = true;
        }else{
            this.nd_window.getChildByName("erweima").active = false;
        }
    },

    onCopyClick: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        if(window.platform){
            window.platform.setClipboardData('末日来袭');
        }
    },

    onBackClick: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        this.close();
    },
});
