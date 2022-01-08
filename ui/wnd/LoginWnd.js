var Windows = require("./Windows");
cc.Class({
    extends: Windows,

    properties: {
        _downtips:null,
    },

    onLoad () {
        this.selfPreName = "LoginWnd";
        this.windowType = 1;
        this.layerType = 1;
        this.aniType = 1;
        this.bannerAdBool = 0;
        this.checkWindow();
    },

    initViewInfo(){
        this._downtips = this.nd_window.getChildByName("downtips");

        cc.jh.utils.addClickEvent(this.nd_window.getChildByName("btn_start"), this.node, this.selfPreName, "onStartClick");
        cc.jh.utils.addClickEvent(this.nd_window.getChildByName("btn_pre"), this.node, this.selfPreName, "onPreClick");
        cc.jh.utils.addClickEvent(this.nd_window.getChildByName("btn_download"), this.node, this.selfPreName, "onPreClick2");

        var side = this.nd_window.getChildByName("side");
        cc.jh.utils.addClickEvent(side.getChildByName("btn_rank"), this.node, this.selfPreName, "onRankClick");
        cc.jh.utils.addClickEvent(side.getChildByName("btn_share1"), this.node, this.selfPreName, "onShareClick");
        cc.jh.utils.addClickEvent(side.getChildByName("btn_share2"), this.node, this.selfPreName, "onSharePYQClick");
        cc.jh.utils.addClickEvent(side.getChildByName("btn_guanzhu"), this.node, this.selfPreName, "onGZHClick");
        cc.jh.utils.addClickEvent(side.getChildByName("btn_reward"), this.node, this.selfPreName, "onRemarkClick");
        cc.jh.utils.addClickEvent(side.getChildByName("btn_jies"), this.node, this.selfPreName, "onIntroduceClick");

        this.updateContent();
        cc.jh.userMgr.updateFriendList();
        cc.jh.audioMgr.playBGM("audio_bgm");
    },


    updateContent(){
        //console.log("1111111111111");
        this.nd_window.getChildByName("btn_pre").active = !cc.jh.userMgr.isSubscribe;
        this.nd_window.getChildByName("btn_download").active = cc.jh.userMgr.isSubscribe;
    },

    onShareClick: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        if(window.platform){
            var shareData = cc.jh.global.getShareData();
            shareData.title = cc.jh.tableMgr.getGlobalValue(1213);
            window.platform.shareAppMessage(shareData.title, shareData.imageUrl, shareData.query);

            window.platform.ald_sendEvent("登录界面分享好友", {"suc":'1'});
        }
    },

    onSharePYQClick: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        if(window.platform){
            var urls = ['https://hd-wechatgame.oss-cn-shanghai.aliyuncs.com/legdys/mrlx-other/share_shot.png'];
            window.platform.previewImage(urls, urls[0]);

            window.platform.ald_sendEvent("登录界面分享朋友圈", {"suc":'1'});
        }
    },

    onGZHClick: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        cc.jh.GuanzhuWindow.show();

        if(window.platform){
            window.platform.ald_sendEvent("登录界面关注公众号", {"suc":'1'});
        }
    },

    onRemarkClick: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        cc.jh.RemarkWindow.show();
        if(window.platform){
            window.platform.ald_sendEvent("登录界面奖励说明", {"suc":'1'});
        }
    },

    fly(){
        this.fly_ani.play('gold_fly_ani');
    },

    onIntroduceClick: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        cc.jh.IntroduceWindow.show();
        if(window.platform){
            window.platform.ald_sendEvent("登录界面游戏介绍", {"suc":'1'});
        }
    },

    onStartClick: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        if(window.platform){
            window.platform.ald_sendEvent("开始游戏2", {"suc":'1'});
        }
        cc.director.loadScene("Main");
    },

    onRankClick: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        cc.jh.RankWindow.show();
        if(window.platform){
            window.platform.ald_sendEvent("登录界面排行榜", {"suc":'1'});
        }
    },

    onPreClick: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        cc.jh.PreRegisterWindow.show();
    },

    onPreClick2: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        // if(cc.jh.userMgr.isSubscribe){
        //     cc.jh.PreSuccessWindow.show();
        // }
        // else{
        //     cc.jh.PreRegisterWindow.show();
        // }
        if(window.platform){
            window.platform.setClipboardData('https://mr.ingames.cn/main.shtml');
            window.platform.ald_sendEvent("登录界面注册", {"suc":'1'});
        }
        this.showDownTips();
    },

    showDownTips(){
        this._downtips.active = true;
        this._downtips.opacity = 255;
        var delay = cc.delayTime(3);
        var fadeOut = cc.fadeOut(1.0);
        var seq = cc.sequence(delay, fadeOut);
        this._downtips.runAction(seq);
    }
});
