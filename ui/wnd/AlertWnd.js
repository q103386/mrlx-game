var Windows = require("./Windows");

cc.Class({
    extends: Windows,

    properties: {
        btn_ok:null,
        btn_cancel:null,
        lb_title:null,
        lb_content:null,

        _titleparame:null,
        _contentparame:null,
        _onok:null,
        _oncancel:null,
        _needcancel:false,
        _forbidbackclose:false,
    },

    onLoad () {
        this.selfPreName = "AlertWnd";
        this.windowType = 2;
        this.layerType = 2;
        this.checkWindow();
    },

    initViewInfo(){
        this.lb_title = this.nd_window.getChildByName("title").getComponent(cc.Label);
        this.lb_content = this.nd_window.getChildByName("content").getComponent(cc.RichText);
        
        var btns = this.nd_window.getChildByName("btns")
        this.btn_ok = btns.getChildByName("confimBtn");
        this.btn_cancel = btns.getChildByName("cancelBtn");
        
        cc.jh.utils.addClickEvent(this.btn_ok,this.node,"AlertWnd","onBtnClick");
        cc.jh.utils.addClickEvent(this.btn_cancel,this.node,"AlertWnd","onBtnClick");

        if(this._onok){
            this.showParame(this._titleparame, this._contentparame,this._onok,this._oncancel,this._needcancel,this._forbidbackclose)
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

    showParame:function(title,content,onok,oncancel,needcancel,forbidbackclose){
        this._onok = onok;
        this._oncancel = oncancel;
        this._titleparame = title;
        this._contentparame = content;
        this._needcancel = needcancel;
        this._forbidbackclose = forbidbackclose;

        if(this.lb_title == null){
            this.open();
        }
        else{
            this.lb_title.string = title;
            this.lb_content.string = content;

            this.show();
            if(needcancel){
                this.btn_cancel.active = true;
            }
            else{
                this.btn_cancel.active = false;
            }
            if(forbidbackclose){
                this.windowType = 3;
            }
            else{
                this.windowType = 2;
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

    onBtnClick:function(event){
        if(event.target.name == "confimBtn"){
            if(this._onok){
                this._onok();
            }
        }
        else if(event.target.name == "cancelBtn"){
            if(this._oncancel){
                this._oncancel();
            }
        }
        this._onok = null;
        this._oncancel = null;
        this._titleparame = '';
        this._contentparame = '';
        this._needcancel = false;
        this._forbidbackclose = false;
        this.hide();
    },
});
