var Windows = require("./Windows");
cc.Class({
    extends: Windows,

    properties: {
        _rankList:null,
        _myRankData:null,
        _rankData:null,


        _nd_mainList:null,
        mainListData:null,
        historyData:null,
    },

    onLoad () {
        this.selfPreName = "RankWindow";
        this.windowType = 2;
        this.layerType = 1;
        this.aniType = 3;
        this.bannerAdBool = 0;
        this.checkWindow();
    },

    initViewInfo(){
        if(this.node){
            
        }
        this._rankList = [];
        for (let index = 0; index < 2; index++) {
            var rankNode = this.nd_window.getChildByName("rank" + (index + 1));
            this._rankList.push({
                itemNode: rankNode,
                nickName: rankNode.getChildByName("name").getComponent(cc.Label),
                score: rankNode.getChildByName("score").getChildByName("value").getComponent(cc.Label),
                rank: rankNode.getChildByName("icon").getChildByName("value").getComponent(cc.Label),
                icon: rankNode.getChildByName("player").getComponent("ImageLoad")
            })
        }

        this._nd_mainList = this.nd_window.getChildByName("ranklist").getComponent("List");

        var mainListEventHandler = new cc.Component.EventHandler();
        mainListEventHandler.target = this.node;
        mainListEventHandler.component = this.selfPreName;
        mainListEventHandler.handler = "onMainListRender";
        this._nd_mainList.renderEvent = mainListEventHandler;

        var myRank = this.nd_window.getChildByName("myrank");
        this._myRankData = {
            itemNode: rankNode,
            nickName: myRank.getChildByName("name").getComponent(cc.Label),
            score: myRank.getChildByName("score").getChildByName("value").getComponent(cc.Label),
            rank: myRank.getChildByName("icon").getChildByName("value").getComponent(cc.Label),
            icon: myRank.getChildByName("player").getComponent("ImageLoad")
        }
        cc.jh.utils.addClickEvent(this.nd_window.getChildByName("btn_close"), this.node, this.selfPreName, "onCloseClick");
        cc.jh.utils.addClickEvent(this.nd_window.getChildByName("btn_share"), this.node, this.selfPreName, "onShareClick");
        cc.jh.utils.addClickEvent(this.nd_window.getChildByName("btn_remark"), this.node, this.selfPreName, "onRemarkClick");
    },

    onShow:function(){
        var self = this;
        cc.jh.net.getRankList(cc.jh.global.scoreRankKey)
            .then((res)=>{
                if(res.code == 1000){
                    console.log('getRankList suc', res);
                    self._rankData = res.data;
                    self.updateContent();
                }
                else{
                    console.log('getRankList fail', res);
                }
            })
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


    onRemarkClick: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        cc.jh.WinningWnd.show();
        if(window.platform){
            window.platform.ald_sendEvent("排行榜中奖名单", {"suc":'1'});
        }
    },

    updateContent(){
        if(this._rankData){
            var myrank = this._rankData.myRank;
            var rankList = this._rankData.rankList;
            this.historyData = [];
            for (let index = 0; index < this._rankList.length; index++) {
                if(index < rankList.length){
                    this._rankList[index].itemNode.active = true;
                    this._rankList[index].nickName.string = rankList[index].nickname;
                    this._rankList[index].score.string = rankList[index].score;
                    this._rankList[index].rank.string = rankList[index].rank;
                    this._rankList[index].icon.loadImage(rankList[index].headimgurl);
                }
                else{
                    this._rankList[index].itemNode.active = false;
                }
            }

            for (let index = 2; index < rankList.length; index++) {
                this.historyData.push(rankList[index]);
            }

            this.mainListData = this.historyData;
            this._nd_mainList.numItems = this.historyData.length;

            this._myRankData.nickName.string = cc.jh.userMgr.userName;
            if(myrank){
                this._myRankData.score.string = myrank.score;
                if(myrank.rank == null){
                    this._myRankData.rank.string = "100+";
                }else{
                    this._myRankData.rank.string = myrank.rank;
                }
                
            }
            else{
                this._myRankData.score.string = 0;
                this._myRankData.rank.string = 0;
            }
            this._myRankData.icon.loadImage(cc.jh.userMgr.avatarUrl);
        }
    },

    onMainListRender(item, idx) {
        var data = this.historyData[idx];

        var nickName = item.getChildByName("name").getComponent(cc.Label);
        var score = item.getChildByName("score").getChildByName("value").getComponent(cc.Label);
        var rank = item.getChildByName("icon").getChildByName("value").getComponent(cc.Label);
        var icon = item.getChildByName("player").getComponent("ImageLoad");

        nickName.string = data.nickname;
        score.string = data.score;
        rank.string = data.rank;
        if(data.rank == 3 ){
            var self = this;
            cc.loader.loadRes("texture/icon_rank3", cc.SpriteFrame, function (err, spriteFrame) {
                item.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
        }
        if(data.rank > 10){
            item.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = null;
        }
        if(data.rank > 3 && data.rank <11){
            var self = this;
            cc.loader.loadRes("texture/icon_rank4", cc.SpriteFrame, function (err, spriteFrame) {
                item.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
        }
        icon.loadImage(data.headimgurl);
    },

    

    onShareClick: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        if(window.platform){
            var shareData = cc.jh.global.getShareData();
            shareData.title = cc.jh.tableMgr.getGlobalValue(1211);
            window.platform.shareAppMessage(shareData.title, shareData.imageUrl, shareData.query);

            window.platform.ald_sendEvent("排行榜分享", {"suc":'1'});
        }
    },

    onCloseClick: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        this.hide();
    },
});
