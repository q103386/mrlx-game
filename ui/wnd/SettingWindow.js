var Windows = require("./Windows");
cc.Class({
    extends: Windows,

    properties: {
        self_music:null,
        self_sfx:null,
        self_vibrate:null,
        self_userid:null,
    },

    onLoad () {
        this.selfPreName = "SettingWindow";
        this.windowType = 2;
        this.layerType = 1;
        this.aniType = 3;
        this.bannerAdBool = 0;
        this.checkWindow();
    },

    initViewInfo(){
        cc.jh.utils.addClickEvent(this.nd_window.getChildByName("btnclose"), this.node, this.selfPreName, "onCloseClick");

        this.self_music = this.nd_window.getChildByName("music").getComponent("UIToggle");
        this.self_sfx = this.nd_window.getChildByName("sfx").getComponent("UIToggle");
        this.self_vibrate = this.nd_window.getChildByName("vibrate").getComponent("UIToggle");
        this.self_userid = this.nd_window.getChildByName("id").getComponent(cc.Label);

        cc.jh.utils.addClickEvent(this.self_music.node, this.node, this.selfPreName, "onToggleClick");
        cc.jh.utils.addClickEvent(this.self_sfx.node, this.node, this.selfPreName, "onToggleClick");
        cc.jh.utils.addClickEvent(this.self_vibrate.node, this.node, this.selfPreName, "onToggleClick");

        this.self_userid.string = "ID:" + cc.jh.userMgr.userId;

        cc.jh.utils.addClickEvent(this.nd_window.getChildByName("btn_restart"), this.node, this.selfPreName, "onRestartClick");
        cc.jh.utils.addClickEvent(this.nd_window.getChildByName("btn_back"), this.node, this.selfPreName, "onBackClick");
    },

    onShow(){
        this.updateContent();
    },

    updateContent(){
        this.self_music.isChecked = cc.jh.audioMgr.bgmVolume > 0;
        this.self_sfx.isChecked = cc.jh.audioMgr.sfxVolume > 0;
        this.self_vibrate.isChecked = cc.jh.global.vibratelong > 0;
    },

    onToggleClick: function(event) {
        if(event.target === this.self_music.node){
            if(cc.jh.audioMgr.bgmVolume > 0){
                cc.jh.audioMgr.setBGMVolume(0);
            }
            else{
                cc.jh.audioMgr.setBGMVolume(1);
            }
        }
        else if(event.target === this.self_sfx.node){
            if(cc.jh.audioMgr.sfxVolume > 0){
                cc.jh.audioMgr.setAudioVolume(0);
            }
            else{
                cc.jh.audioMgr.setAudioVolume(0.5);
            }

            cc.jh.sceneMgr.dispatchEvent('change_sfxvolume', cc.jh.audioMgr.sfxVolume);
        }
        else if(event.target === this.self_vibrate.node){
            if(cc.jh.global.vibratelong){
                cc.jh.global.setVibratelong(0);
            }
            else{
                cc.jh.global.setVibratelong(1);
            }
        }
        this.updateContent();
    },
    onBackClick: function(event) {
        cc.jh.sceneMgr.stopShake();
        cc.jh.audioMgr.playAudio("audio_click");
        cc.jh.userMgr.resetGameData();
        cc.director.loadScene("Login");
    },

    onRestartClick: function(event) {
        cc.jh.sceneMgr.stopShake();
        cc.jh.audioMgr.playAudio("audio_click");
        cc.jh.userMgr.resetGameData();
        cc.director.loadScene("Main");
    },

    onCloseClick: function(event) {
        cc.jh.gameControl.resumeGame();
        this.hide();
    },
});
