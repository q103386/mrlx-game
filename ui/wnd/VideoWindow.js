var Windows = require("./Windows");
cc.Class({
    extends: Windows,

    properties: {
        _lb_title:null,
        _nd_content:null,
        _icon:null,
        _btn_label:null,
        _btnvideo:null,

        _type:null,
        _data:null,
    },

    onLoad () {
        this.selfPreName = "VideoWindow";
        this.windowType = 2;
        this.layerType = 1;
        this.aniType = 3;
        this.checkWindow();
    },

    initViewInfo(){
        this._lb_title = this.nd_window.getChildByName("title").getComponent(cc.Label);
        this._nd_content = this.nd_window.getChildByName("content").getComponent(cc.Label);
        this._icon = this.nd_window.getChildByName("icon").getComponent("ImageLoad");
        this._btn_label = this.nd_window.getChildByName("btnsell").getChildByName("btnlabel").getComponent(cc.Label);
        this._btnvideo = this.nd_window.getChildByName("btnsell");
        cc.jh.utils.addClickEvent(this.nd_window.getChildByName("btnclose"), this.node, this.selfPreName, "onCloseClick");
        cc.jh.utils.addClickEvent(this._btnvideo, this.node, this.selfPreName, "onVideoClick");
    },

    onShow(){
        this.updateContent();
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

    showParame(type, data){
        this._type = type;
        this._data = data;
        this.show();
    },

    updateContent(){
        if(this._type === 0){
            var armyconf = cc.jh.tableMgr.getArmy(this._data);
            this._lb_title.string = "看视频领取炮台";
            this._nd_content.string = "Lv." + armyconf.level;
            this._icon.loadImage(armyconf.Icon);
            this._btn_label.string = "免费领取";
        }
        else if(this._type === 1){
            var coins = cc.jh.userMgr.armycoins[this._data];
            this._lb_title.string = "免费领金币";
            this._nd_content.string = cc.jh.utils.numberFormat(coins * 3);
            this._icon.setImage(cc.jh.spriteMgr.getCommonIocn("icon_coin_1"));
            this._btn_label.string = "免费领取";
        }
        else if(this._type === 3){
            var coins = cc.jh.userMgr.armycoins[this._data];
            this._lb_title.string = "签到奖励";
            this._nd_content.string = cc.jh.utils.numberFormat(coins * 3);
           
            this._btn_label.string = "再领一次";

            let signconf = cc.jh.tableMgr.getAllSign();
            let sign = cc.jh.userMgr.sign;
            let select = sign.selects[sign.num-1];
            let conf = signconf[sign.num-1];
            let reward = conf.Reward[select];
            let rewardnum = conf.RewardNum[select];
            if(reward === 1){
                this._icon.setImage(cc.jh.spriteMgr.getCommonIocn("btn_12"));
                this._nd_content.string = "金币掉落+" + rewardnum + "% (永久)";
            }
            else if(reward === 2){
                this._icon.setImage(cc.jh.spriteMgr.getCommonIocn("btn_13"));
                this._nd_content.string = "攻击+" + rewardnum + "% (永久)";
            }
            else if(reward === 3){
                this._icon.setImage(cc.jh.spriteMgr.getCommonIocn("btn_16"));
                this._nd_content.string = "暴击率+" + rewardnum + "% (永久)";
            }
            else if(reward === 4){
                this._icon.setImage(cc.jh.spriteMgr.getCommonIocn("btn_17"));
                this._nd_content.string = "暴击伤害+" + rewardnum + "% (永久)";
            }
        }
        else if(this._type === 7){
            var armyconf = cc.jh.tableMgr.getArmy(this._data.armyid);
            this._lb_title.string = "看视频免费升级";
            this._nd_content.string = "Lv." + armyconf.level;
            this._icon.loadImage(armyconf.Icon);
            this._btn_label.string = "免费升级";
        }
        else if(this._type === 8){
            var armyconf = cc.jh.tableMgr.getArmy(this._data.armyid);
            this._lb_title.string = "离线收益通知";
            this._nd_content.string = "离线收益满了告诉我";
            this._icon.setImage(cc.jh.spriteMgr.getCommonIocn("icon_coin_1"));
            this._btn_label.string = "确定";
        }

        if(this._btnvideo.active){
            let videoicon = this._btnvideo.getChildByName("icon_ad_1").getComponent(cc.Sprite);
            videoicon.spriteFrame = cc.jh.spriteMgr.getCommonIocn(cc.jh.global.videolimit ? "icon_share_1" : "icon_ad_1");
            if(this._type === 8){
                videoicon.node.active = false;
                this._btn_label.node.x = 0;
            }
            else{
                videoicon.node.active = true;
                this._btn_label.node.x = 39;

                if(this._type === 1){
                    if(cc.jh.global.videolimit || cc.jh.userMgr.hasDayMultiplereward('freecoins')){
                        videoicon.spriteFrame = cc.jh.spriteMgr.getCommonIocn("icon_share_1");
                    }
                    else{
                        videoicon.spriteFrame = cc.jh.spriteMgr.getCommonIocn(cc.jh.global.videolimit ? "icon_share_1" : "icon_ad_1");
                    }
                }
            }
        }
    },

    onVideoClick: function(event) {
        if(this._type === 0){
            let videoAdId = "看视频获取炮台";
            var armyconf = cc.jh.tableMgr.getArmy(this._data);
            var idx = cc.jh.gameControl.getEmptyGrid();
            cc.jh.global.getVideoReward(videoAdId, function(){
                cc.jh.gameControl.createDroop(idx, armyconf);
                cc.jh.audioMgr.playAudio("audio_buy");
            }, null);
        }
        else if(this._type === 1){
            let videoAdId = "看视频领金币";
            var coins = cc.jh.userMgr.armycoins[this._data];
            let share = cc.jh.global.videolimit || cc.jh.userMgr.hasDayMultiplereward('freecoins');
            var self = this;
            cc.jh.global.getVideoReward(videoAdId, 
                function(){
                    if(cc.jh.userMgr.hasDayMultiplereward('freecoins')){
                        cc.jh.userMgr.setDayMultipleReward('freecoins', 1);
                    }
                    cc.jh.userMgr.addCoins(coins * 3);
                    cc.jh.sceneMgr.dispatchEvent('res_anim2',{animnum:12,resid:1000,scale:0.7,beginpos:cc.jh.utils.getTargetPosByLocal(self._icon.node,self.nd_window)});
                }, 
                null,
                true,
                share
                );
        }
        else if(this._type === 3){
            let videoAdId = "看视频再次签到";
            var coins = cc.jh.userMgr.armycoins[this._data];
            var self = this;
            cc.jh.global.getVideoReward(videoAdId, function(){
                let sign = cc.jh.userMgr.sign;
                let signconf = cc.jh.tableMgr.getAllSign();
                let select = sign.selects[sign.num-1];
                let conf = signconf[sign.num-1];
                let reward = conf.Reward[select];
                let rewardnum = conf.RewardNum[select];
                if(reward === 1){
                    cc.jh.userMgr.setAttr(0, rewardnum / 100)
                    cc.jh.TipsWindow.showTip("领取成功！金币掉落+" + rewardnum + "%");
                }
                else if(reward === 2){
                    cc.jh.userMgr.setAttr(1, rewardnum / 100)
                    cc.jh.TipsWindow.showTip("领取成功！攻击+" + rewardnum + "%");
                }
                else if(reward === 3){
                    cc.jh.userMgr.setAttr(2, rewardnum)
                    cc.jh.TipsWindow.showTip("领取成功！暴击率+" + rewardnum + "%");
                }
                else if(reward === 4){
                    cc.jh.userMgr.setAttr(3, rewardnum / 100)
                    cc.jh.TipsWindow.showTip("领取成功！暴击伤害+" + rewardnum + "%");
                }
                let icon = self._icon.getComponent(cc.Sprite).spriteFrame.name;
                let beginpos = cc.jh.utils.getTargetPosByLocal(self._icon.node, self.nd_window);
                let endpos = cc.jh.utils.getTargetPosByLocal(cc.jh.gameControl.node.getChildByName("droopshop"), self.nd_window);
                cc.jh.resAnimWnd.createAttrAnim(cc.jh.spriteMgr.getCommonIocn(icon), beginpos, endpos, 1);
            }, null);
        }
        else if(this._type === 7){
            let videoAdId = "看视频升级炮台";
            let grid = this._data.grid;

            let army = cc.jh.gameControl.getArmyUnitByGrid(grid);
            army.destroySelf();

            var armyconf = cc.jh.tableMgr.getArmy(this._data.armyid);
            cc.jh.global.getVideoReward(videoAdId, function(){
                cc.jh.gameControl.createDroop(grid, armyconf);
                cc.jh.audioMgr.playAudio("audio_buy");
            }, null);
        }
        else if(this._type === 8){
            if(window.platform){
                window.platform.requestSubscribeMessage('XjQ877hhaHzKHiVN8-fIkxzTrM4rqttylBR_Zf3KwCk', 
                function(suc){
                    if(suc){
                        cc.jh.TipsWindow.showTip("订阅成功");
                        cc.jh.userMgr.addSubMessage();
                    }
                    else{

                    }
                    cc.jh.mainWnd.checkSign();
                },
                function(res){
    
                });
            }
            else{
                cc.jh.TipsWindow.showTip("订阅成功");
            }
        }
        this.hide();
    },

    onCloseClick: function(event) {
        this.hide();
        if(this._type === 8){
            cc.jh.mainWnd.checkSign();
        }
    },
});
