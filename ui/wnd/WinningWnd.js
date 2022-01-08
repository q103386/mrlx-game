var Windows = require("./Windows");
cc.Class({
    extends: Windows,

    properties: {
        nd_mainList:null,
        mainListData:null,
        historyData:null,
    },

    onLoad () {
        this.selfPreName = "WinningWnd";
        this.windowType = 2;
        this.layerType = 1;
        this.aniType = 3;
        this.bannerAdBool = 0;
        this.checkWindow();
    },

    initViewInfo(){
        this.nd_mainList = this.nd_window.getChildByName("ranklist").getComponent("List");

        var mainListEventHandler = new cc.Component.EventHandler();
        mainListEventHandler.target = this.node;
        mainListEventHandler.component = this.selfPreName;
        mainListEventHandler.handler = "mainListRender";
        this.nd_mainList.renderEvent = mainListEventHandler;

        cc.jh.utils.addClickEvent(this.nd_window.getChildByName("btn_close"), this.node, this.selfPreName, "onCloseClick");
    },

    changeMaskLine(ang,w){
        this.maskLine.angle = -ang -270;
        this.maskLine.width = w;
    },

    changeKnifeAng(ang){
        this.nd_knife.angle = -ang
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

    offRoom(){
        this.node.active = false;
        if(this.getRmbBool){
            var arrT = [];
            for(let i = 0; i < this.startLayer.moveContent.childrenCount ;i++){
                arrT.push(this.startLayer.moveContent.children[i])
            }
            for(let i = 0; i < arrT.length; i++){
                arrT[i].destroy();
            }
            // if(this.startLayer.moveContent.childrenCount>0){
                
            //     this.startLayer.moveContent.children[0].destroy();
            // }
            this.startLayer.addMoveText(this.myself.myName,this.rmb_n,cc.Color.GREEN);
        }
        //SDKManage.banner();
        
        if(this.startLayer.openA){
            this.startLayer.sceneArr = [1,2,3];
            this.startLayer.openActiveScene(this.startLayer.sceneArr[0]);
            try{
                cc.sys.localStorage.setItem('luckNum',0);
            }
            catch(err){
                           
            }
            this.startLayer.openA = false
        }else{
            this.startLayer.openActive_bool = false;
        }
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
        //this.updateContent();
    },

    updateContent(){
        this.historyData = cc.jh.tableMgr.getAllWinner();
        this.mainListData = this.historyData;
        this.nd_mainList.numItems = this.historyData.length;
    },

    mainListRender(item, idx) {
        var data = this.historyData[idx];

        var nickName = item.getChildByName("name").getComponent(cc.Label);
        var score = item.getChildByName("score").getChildByName("value").getComponent(cc.Label);
        var rank = item.getChildByName("icon").getChildByName("value").getComponent(cc.Label);
        var icon = item.getChildByName("player").getComponent("ImageLoad");

        nickName.string = data.nickname;
        score.string = data.score;
        rank.string = data.rank;
        icon.loadImage(data.headimg);
    },

    onCloseClick: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        this.hide();
    },
});
