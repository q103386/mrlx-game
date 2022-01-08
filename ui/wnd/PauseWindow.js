var Windows = require("./Windows");
cc.Class({
    extends: Windows,

    properties: {
        _wxsubView:null,
    },

    onLoad () {
        this.selfPreName = "PauseWindow";
        this.windowType = 2;
        this.layerType = 1;
        this.aniType = 3;
        this.bannerAdBool = 0;
        this.checkWindow();
    },

    initViewInfo(){
        this._wxsubView = this.nd_window.getChildByName("wxsubview");
        cc.jh.utils.addClickEvent(this.nd_window.getChildByName("btn_back"), this.node, this.selfPreName, "onBackClick");
        cc.jh.utils.addClickEvent(this.nd_window.getChildByName("btn_share"), this.node, this.selfPreName, "onShareClick");
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

    onShow:function(){
        this.updateContent();
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

    updateContent(){
        cc.jh.mainWnd.stopPrePlayerSub();
        if(window.platform){
            this._wxsubView.active = true;
            let width = this._wxsubView.width;
            let height = this._wxsubView.height;
            if(window.platform){
                var shareData = cc.jh.global.getShareData();
                window.platform.updateRankPre2User(
                    cc.jh.global.scoreRankKey,
                    cc.jh.userMgr.openId,
                    width, 
                    height, 
                    cc.jh.gameControl.getScore(),
                    cc.jh.gameControl.getChapter().Level - 1,
                    shareData.title, 
                    shareData.imageUrl,
                    shareData.query,
                );
                var self = this;
                setTimeout(() => {
                    if(self.isActive()){
                        self._wxsubView.active = false;
                        self._wxsubView.active = true;
                    }
                }, 500);
            }
        }
        else{
            this._wxsubView.active = false;
        }
    },

    onShareClick: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        if(window.platform){
            var shareData = cc.jh.global.getShareData();
            shareData.title = cc.jh.tableMgr.getGlobalValue(1214);
            window.platform.shareAppMessage(shareData.title, shareData.imageUrl, shareData.query);

            window.platform.ald_sendEvent("暂停界面告诉他", {"suc":'1'});
        }
    },

    onBackClick: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        this.close();
        cc.jh.mainWnd.updatePrePlayer();
        cc.jh.gameControl.resumeGame();
    },
});
