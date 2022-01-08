var Windows = require("./Windows");
cc.Class({
    extends: Windows,

    properties: {
        
    },

    onLoad () {
        this.selfPreName = "PreSuccessWindow";
        this.windowType = 2;
        this.layerType = 1;
        this.aniType = 3;
        this.bannerAdBool = 0;
        this.checkWindow();
    },

    initViewInfo(){
        cc.jh.utils.addClickEvent(this.nd_window.getChildByName("btn_back"), this.node, this.selfPreName, "onBackClick");
        //cc.jh.utils.addClickEvent(this.nd_window.getChildByName("bg1"), this.node, this.selfPreName, "onSavaClicked");
    },

    onShow:function(){
        this.updateContent();
    },

    updateContent(){
        if(cc.jh.sceneMgr.getCurSceneName() == "Main"){
            cc.jh.gameControl.pauseGame();
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

    onSavaClick: function(event) {
        // cc.jh.audioMgr.playAudio("audio_click");
        // if(window.platform){
        //     var urls = ['http://hd-wechatgame.oss-cn-shanghai.aliyuncs.com/wgjx/other/guanzhu_erweima.png'];
        //     window.platform.previewImage(urls, urls[0]);
        // }
    },

    onBackClick: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
       // cc.jh.gameControl.resumeGame();
        this.close();
        if(cc.jh.sceneMgr.getCurSceneName() == "Main"){
            cc.jh.gameControl.resumeGame();
            cc.jh.gameControl.updateHeroData();
        }
    },
});
