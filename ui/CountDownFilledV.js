
cc.Class({
    extends: cc.Component,

    properties: {
        sprite:cc.Sprite,
        secondLabel:cc.Label,
        _totalSeconds:0,
        startBool:false,
    },

    onLoad () {
        
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

    setCountDownData(totalSeconds){
        this._totalSeconds = totalSeconds;
        this.startBool = true;
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
    
    updateContent(curSeconds){
        if(this.sprite){
            this.sprite.fillRange = 1 - (this._totalSeconds - curSeconds) / this._totalSeconds;
            this.secondLabel.string = Math.floor(curSeconds / 1000) + "秒";
        }
    },
});
