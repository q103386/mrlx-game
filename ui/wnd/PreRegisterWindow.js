var Windows = require("./Windows");
cc.Class({
    extends: Windows,

    properties: {
        _edt_phoneIpt:null,
        _edt_codeIpt:null,
        _codeCd:null,
        _btnGetCode:null,
        _cdTime:0,
        _pAndroid:null,
        _pios:null,
    },

    onLoad () {
        this.selfPreName = "PreRegisterWindow";
        this.windowType = 2;
        this.layerType = 1;
        this.aniType = 3;
        this.bannerAdBool = 0;
        this.checkWindow();
    },

    initViewInfo(){
        this._edt_phoneIpt = this.nd_window.getChildByName("phoneipt").getComponent(cc.EditBox);
        this._edt_codeIpt = this.nd_window.getChildByName("codeipt").getComponent(cc.EditBox);
        this._codeCd = this.nd_window.getChildByName("codecd").getComponent(cc.Label);

        var platRoot = this.nd_window.getChildByName("platform");
        this._pAndroid = platRoot.getChildByName("toggle1").getComponent(cc.Toggle);
        this._pios = platRoot.getChildByName("toggle2").getComponent(cc.Toggle);

        this._btnGetCode = this.nd_window.getChildByName("btn_getyzm");
        cc.jh.utils.addClickEvent(this.nd_window.getChildByName("btn_back"), this.node, this.selfPreName, "onBackClick");
        cc.jh.utils.addClickEvent(this._btnGetCode, this.node, this.selfPreName, "onGetCodeClick");
        cc.jh.utils.addClickEvent(this.nd_window.getChildByName("btn_confirm"), this.node, this.selfPreName, "onOKClick");
    },

    onShow:function(){
        this.updateContent();
        if(window.platform){
            var timestamp=new Date().getTime();
            var dt = {
                event:"mrwx_pullup_page",
                time: timestamp,
                app_id:8529,
                user_unique_id : cc.jh.userMgr.openId,
                game_deviceid:"",
                ad_parameter:"",
            }
            var str = JSON.stringify(dt);
            cc.jh.net.setGameLog("mrwx_pullup_page",str);
            window.platform.ald_sendEvent("预约窗口调出", {"suc":'1'});
        }
    },

    updateContent(){
        this._codeCd.active = false;
    },

    updateCd(){
        if(this.nd_window){
            this._cdTime -= 1;
            this._codeCd.string = this._cdTime.toFixed(0) + "s";
            if(this._cdTime <= 0){
                this._btnGetCode.active = true;
                this._codeCd.node.active = false;
            }
        }
    },

    onGetCodeClick: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        if(!cc.jh.utils.isPositiveInteger(this._edt_phoneIpt.string) || this._edt_phoneIpt.string.length != 11){
            cc.jh.TipsWindow.showTip("请输入有效的手机号");
            return;
        }
        this._cdTime = 60;
        this._btnGetCode.active = false;
        this._codeCd.node.active = true;
        this._codeCd.string = this._cdTime.toFixed(0) + "s";
        this.schedule(this.updateCd, 1, this._cdTime, 0);
        cc.jh.net.getPhoneCode(this._edt_phoneIpt.string)
            .then((res)=>{
                if(res.code == 1000){
                    console.log('getPhoneCode suc', res);
                }
                else{
                    cc.jh.TipsWindow.showTip(res.message);
                    console.log('getPhoneCode fail', res);
                }
            })
    },

    onOKClick: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        if(!cc.jh.utils.isPositiveInteger(this._edt_phoneIpt.string) || this._edt_phoneIpt.string.length != 11){
            cc.jh.TipsWindow.showTip("请输入有效的手机号");
            return;
        }
        if(this._edt_codeIpt.string.length === 0){
            cc.jh.TipsWindow.showTip("请输入验证码");
            return;
        }
        cc.jh.net.checkPhoneCode(this._edt_phoneIpt.string, this._edt_codeIpt.string, this._pAndroid.isChecked ? 'android' : 'ios',"")
            .then((res)=>{
                if(res.code == 1000){
                    console.log('checkPhoneCode suc', res);
                    this.closeWnd();
                    cc.jh.userMgr.isSubscribe = true;
                    cc.jh.PreSuccessWindow.show();

                    if(window.platform){
                        window.platform.ald_sendEvent("预约成功", {"suc": "1"});
                        var timestamp=new Date().getTime();
                            var dt = {
                                event:"mrwx_pullup_success",
                                time: timestamp,
                                app_id:8529,
                                user_unique_id : cc.jh.userMgr.openId,
                                game_deviceid:"",
                                ad_parameter:"",
                                reserve_phone:this._edt_phoneIpt.string,
                                reserve_os:this._pAndroid.isChecked ? 'android' : 'ios',
                            }
                            var str = JSON.stringify(dt);
                            cc.jh.net.setGameLog("mrwx_pullup_success",str);
                    }
                    cc.jh.LoginWnd.updateContent();
                  
                }
                else{
                    cc.jh.TipsWindow.showTip(res.message);
                    console.log('getPhoneCode fail', res);
                }
            })
    },

    onBackClick: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        this.closeWnd();
        if(cc.jh.sceneMgr.getCurSceneName() == "Main"){
            cc.jh.gameControl.resumeGame();
        }
    },

    closeWnd(){
        this.unschedule(this.updateCd);
        this.close();
        if(window.platform){
            window.platform.ald_sendEvent("预约窗口关闭", {"suc":'1'});
        }
    }
});
