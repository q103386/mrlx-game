var Windows = require("./Windows");
cc.Class({
    extends: Windows,

    properties: {
        
    },

    onLoad () {
        this.selfPreName = "RemarkWindow";
        this.windowType = 2;
        this.layerType = 1;
        this.aniType = 3;
        this.bannerAdBool = 0;
        this.checkWindow();
    },

    needjump10(dd){
        this.addjump10();
        if(this.jump10node){
            this.jump10node.getComponent('bannerScr_10').changedd(dd)
            this.jump10node.active = true;
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

    initViewInfo(){
        cc.jh.utils.addClickEvent(this.nd_window.getChildByName("btnclose"), this.node, this.selfPreName, "onCloseClick");
    },

    onShow:function(){
      
    },

    onCloseClick: function(event) {
        if(cc.jh.sceneMgr.getCurSceneName() == "Main"){
            cc.jh.gameControl.resumeGame();
        }
        this.hide();
    },
});
