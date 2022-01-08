var Windows = require("./Windows");
cc.Class({
    extends: Windows,

    properties: {
        _gameStep:null,
        _lb_score1:null,
        _lb_score2:null,
        _lb_score3:null,
        _lb_score4:null,
        nd_coins:null,
        _btnPre:null,
        _btnShare:null,

        _btnSub:null,
        _btnRestart:null,
        _lb_rank:null,
        _lb_pre:null,
        _lb_surpass:null,
        _lb_final2:null,

    },

    onLoad () {
        this.selfPreName = "ResultWindow";
        this.windowType = 2;
        this.layerType = 1;
        this.aniType = 3;
        this.bannerAdBool = 0;
        this.checkWindow();
    },

    initViewInfo(){
        this._gameStep = this.nd_window.getChildByName("gamestep").getComponent(cc.Label);
        this.nd_coins = this.nd_window.getChildByName("restcoin").getComponent(cc.Label);
        var scoreRoot = this.nd_window.getChildByName("score");
        this._lb_score1 = scoreRoot.getChildByName("score_step").getComponent(cc.Label);
        this._lb_score2 = scoreRoot.getChildByName("score_coin").getComponent(cc.Label);
        this._lb_score3 = scoreRoot.getChildByName("score_kill").getComponent(cc.Label);
        this._lb_score4 = scoreRoot.getChildByName("score_final").getComponent(cc.Label);
        this._btnShare = this.nd_window.getChildByName("btn_share");
        this._btnPre = this.nd_window.getChildByName("btn_pre");

        this._lb_final2 = scoreRoot.getChildByName("score_final2").getComponent(cc.Label);
        this._btnSub = this.nd_window.getChildByName("btn_sub");
        this._btnRestart = this.nd_window.getChildByName("btn_Restart");
        this._lb_rank = scoreRoot.getChildByName("score_rank").getComponent(cc.Label);
        this._lb_pre = scoreRoot.getChildByName("score_pre").getComponent(cc.Label);
        this._lb_surpass = scoreRoot.getChildByName("score_surpass").getComponent(cc.Label);

        cc.jh.utils.addClickEvent(this.nd_window.getChildByName("btn_back"), this.node, this.selfPreName, "onBackClick");
        cc.jh.utils.addClickEvent(this._btnShare, this.node, this.selfPreName, "onShareClick");
        cc.jh.utils.addClickEvent(this._btnPre, this.node, this.selfPreName, "onPreClick");
        cc.jh.utils.addClickEvent(this._btnSub, this.node, this.selfPreName, "onSubscribe");
        cc.jh.utils.addClickEvent(this._btnRestart, this.node, this.selfPreName, "onRestartClick");
    },

    onShow:function(){
        this.updateContent();
    },

    

    onliveBt(){
        var self = this;
        if(!this.liveBool){
            return
        }
        this.liveBool = false;
        var adcb = function(){
            self.liveBool = true;
            self.liveNum += 1;
            self.openWinRoom(0);
        } 
        var fcb = function(){
            self.liveBool = true;
        }
        SDKManage.Share('redPacketAgain',null,adcb,fcb);
    },

    updateContent(){
        this._btnShare.active =  cc.jh.userMgr.isSubscribe;
        this._btnSub.active = !cc.jh.userMgr.isSubscribe;
        cc.jh.audioMgr.playAudio("audio_win");
        this._gameStep.string = cc.jh.gameControl.getChapter().Level;
        this._lb_score1.string = cc.jh.gameControl.getLevelScore() + "分";
        this._lb_score2.string = Math.round(cc.jh.userMgr.coins / 10).toFixed(0) + "分";
        this._lb_score3.string = cc.jh.gameControl.getScore() + "分";
        var jc = 0;
        if(cc.jh.userMgr.isSubscribe){
            jc = Math.floor((cc.jh.gameControl.getLevelScore() + Math.round(cc.jh.userMgr.coins / 10) + cc.jh.gameControl.getScore()) / 10)
        }
        this._lb_pre.string = jc + "分";

        var totalScore = cc.jh.gameControl.getLevelScore() + Math.round(cc.jh.userMgr.coins / 10) + cc.jh.gameControl.getScore() + jc;

        this._lb_score4.string = totalScore + "分";
        this._lb_final2.string = totalScore;
        this.nd_coins.string = cc.jh.userMgr.coins;
        
        this._btnPre.active = false;
        this._btnShare.active = true;

        if(window.platform){
            var cLevel = Math.ceil(cc.jh.userMgr.coins / 500);
            window.platform.ald_sendEvent("失败金币分档", {"suc": cLevel + ""});

            window.platform.submitScore(cc.jh.global.scoreRankKey, totalScore);
        }
        console.log("rank set ",totalScore,cc.jh.userMgr.maxScore)
        if(totalScore > cc.jh.userMgr.maxScore){
            cc.jh.userMgr.setMaxScore(totalScore);
        }
        var self = this;
        cc.jh.net.getRankList(cc.jh.global.scoreRankKey)
            .then((res)=>{
                if(res.code == 1000){
                    var dt = res.data.myRank;
                    if(dt && dt.rank){                       
                        self._lb_rank.string = dt.rank;
                        self._lb_surpass.string = res.data.count - dt.rank;
                    }else{
                        self._lb_rank.string = res.data.count + 1;
                        self._lb_surpass.string = 0;
                    }
                   
                }
                else{
                    console.log('getRankList fail', res);
                }
            })

    },

    onShareClick: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        if(window.platform){
            var shareData = cc.jh.global.getShareData();
            shareData.title = cc.jh.tableMgr.getGlobalValue(1209).format(cc.jh.gameControl.getChapter().Level);
            window.platform.shareAppMessage(shareData.title, shareData.imageUrl, shareData.query);

            window.platform.ald_sendEvent("结算分享", {"suc":'1'});
        }
        // cc.jh.global.getShareReward(function(){
        //     cc.jh.gameControl.continueGame();
        //     cc.jh.resultWnd.close();
        // })
    },

    onRestartClick: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        cc.jh.userMgr.resetGameData();
        cc.director.loadScene("Main");
    },

    onPreClick: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        cc.jh.PreRegisterWindow.show();
    },

    onBackClick: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        cc.jh.userMgr.resetGameData();
        cc.director.loadScene("Login");
    },

    onSubscribe(){
        cc.jh.audioMgr.playAudio("audio_click");
        cc.jh.PreRegisterWindow.show();
    }
});
