var Windows = require("./Windows");
cc.Class({
    extends: Windows,

    properties: {
       nd_coins:null,
       nd_coinsicon:null,
       hp:null,
       sp_hpIcon:null,
       gameStepNum:null,
       scoreNum:null,
       
       _btnroulette:null,
       nd_roulettetips:null,
       nd_skilltips:null,
       nd_atkbufftips:null,
       nd_coinbufftips:null,
       nd_speedbufftips:null,

       btn_speed:null,
       _bosscome:null,
       _step:null,
       _steplv:null,

       btn_Invite:null,
       lb__invite:null,
       lb__inviteValue:null,
       lb_inviteTips:null,
       lb_inviteAdd:null,

       _descRoot:null,
       _descContent:null,

       _detailRoot:null,
       _sellPrice:null,
       _upgradePrice:null,

       _preplayerview:null,
       _preplayerviewSub:null,

       _speedbuffcd:null,
       _addatkcd:null,
       _coinbuffcd:null,
       _skillcd:null,
       _skillicon:null,
       _curskillid:0,
       
    },

    onLoad () {
        this.selfPreName = "MainWnd";
        this.windowType = 1;
        this.layerType = 1;
        this.checkWindow();
    },

    initViewInfo(){
        if(window.platform){
            window.platform.ald_sendEvent("开屏", {"suc": '2'});
        }
        cc.jh.guideWnd.show();

        this.nd_coins = cc.find("top/money/coins",this.nd_window).getComponent(cc.Label);
        this.nd_coinsicon = cc.find("top/money/icon_coin_1",this.nd_window);
        this.hp = cc.find("top/hp/coins",this.nd_window).getComponent(cc.Label);
        this.sp_hpIcon = cc.find("top/hp/icon_coin_1",this.nd_window);
        this.gameStepNum = cc.find("top/gamestep/number",this.nd_window).getComponent(cc.Label);

        this._bosscome = this.nd_window.getChildByName("bosscome");
        this._step = this.nd_window.getChildByName("gamestep");
        this._steplv = cc.find("game_icon_checkpoint/lv",this._step).getComponent(cc.Label);

        var topRoot = this.nd_window.getChildByName("top")
        this.scoreNum = topRoot.getChildByName("score").getChildByName('number').getComponent(cc.Label);
        this._preplayerview = topRoot.getChildByName("preplayer").getChildByName("preplayerview");
        this._preplayerviewSub = this._preplayerview.getChildByName("WXSubContextView").getComponent(cc.WXSubContextView);

        cc.jh.utils.addClickEvent(topRoot.getChildByName("preplayer"), this.node, this.selfPreName, "onPrePlayer");
        this.btn_Invite = topRoot.getChildByName("invite");
        this.lb__invite = this.btn_Invite.getChildByName("txt");
        this.lb__inviteValue = this.btn_Invite.getChildByName("value").getComponent(cc.Label);
        this.lb_inviteTips = this.btn_Invite.getChildByName("tips");
        this.lb_inviteAdd = this.btn_Invite.getChildByName("add");
        cc.jh.utils.addClickEvent(this.btn_Invite, this.node, this.selfPreName, "onInvite");

        var rightbtns = this.nd_window.getChildByName("rightbtn");
        this.btn_speed = rightbtns.getChildByName("btn_speed");
        cc.jh.utils.addClickEvent(rightbtns.getChildByName("btn_pause"), this.node, this.selfPreName, "onPause");
        cc.jh.utils.addClickEvent(this.btn_speed, this.node, this.selfPreName, "onAddSpeed");
        cc.jh.utils.addClickEvent(rightbtns.getChildByName("btn_setting"), this.node, this.selfPreName, "onSetting");
        cc.jh.utils.addClickEvent(rightbtns.getChildByName("btn_note"), this.node, this.selfPreName, "onRemarkWindow");

        this._descRoot = this.nd_window.getChildByName("desc");
        this._descContent = this._descRoot.getChildByName("content").getComponent(cc.Label);

        this._detailRoot = this.nd_window.getChildByName("detail");
        var sellBtn = this._detailRoot.getChildByName("sell");
        var upgradeBtn = this._detailRoot.getChildByName("upgrade");
        this._sellPrice = sellBtn.getChildByName("number").getComponent(cc.Label);
        this._upgradePrice = upgradeBtn.getChildByName("number").getComponent(cc.Label);
        cc.jh.utils.addClickEvent(sellBtn, this.node, this.selfPreName, "onTroopSell");
        cc.jh.utils.addClickEvent(upgradeBtn, this.node, this.selfPreName, "onArmyUpgrade");

        this.initEventHandlers();

        this.updateContent();
    },

    start: function() {
        this.updatePrePlayer();

        this.schedule(function() {
            cc.jh.userMgr.updateFriendList();
            cc.jh.mainWnd.updateInviteInfo();
        }, 60);
    },

    bt_true(){
        var cb = function(){
            cc.hh.global.hideInvite();
            cc.hh.global.hideBanner();
        }
        var fcb = function(){
            cc.hh.global.hideInvite();
            cc.hh.global.addMoreGame()
            cc.hh.global.hideBanner();
        }
        cc.hh.global.ydm.gotoRandomCross(cb,fcb)
    },

    onDestroy: function(){
        this.unscheduleAllCallbacks();
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

    initEventHandlers:function(){
        var self = this;
        this.node.on('game_on_show',function(data){
            cc.jh.audioMgr.resumeBGM();
            cc.jh.gameControl.resumeGame();
            if(new Date().getTime() - cc.jh.global.sharetime < 3000){
                cc.jh.global.sharesucces = false;
            }
        });

        this.node.on('game_on_hide',function(data){
            cc.jh.audioMgr.pauseBGM();
            cc.jh.gameControl.pauseGame();
        });

        this.node.on('fetch_collectmingame',function(data){
            cc.jh.audioMgr.playAudio("audio_coinget");
            let coins = cc.jh.userMgr.armycoins[cc.jh.userMgr.maxarmy];
            cc.jh.userMgr.addCoins(coins);
            cc.jh.sceneMgr.dispatchEvent('res_anim2',{animnum:12,resid:1000,scale:0.7,beginpos:cc.v2(0,0)});
        });

        this.node.on('fetch_showfloating',function(data){
            cc.jh.audioMgr.playAudio("audio_coinget");
            let coins = cc.jh.userMgr.armycoins[cc.jh.userMgr.maxarmy];
            cc.jh.userMgr.addCoins(coins);
            cc.jh.sceneMgr.dispatchEvent('res_anim2',{animnum:12,resid:1000,scale:0.7,beginpos:cc.v2(0,0)});
            if(cc.jh.floatingWnd.isActive()){
                cc.jh.floatingWnd.close();
            }
        });

        this.node.on('update_coins',function(data){
            self.updateCoins();
            cc.jh.gameControl.updateArmyLvUp();
            cc.jh.gameControl.checkBuyDroop();
        });

        this.node.on('start_game',function(data){
            cc.jh.audioMgr.playAudio("sound_ui_start");
            self.showGameStepAnim();
            self.updateGameStep();
        });

        this.node.on('over_game',function(data){
            cc.jh.resultWnd.show();
        });

        this.node.on('update_gamestep',function(data){
            self.showGameStepAnim();
            self.updateGameStep();

            //var chapter = cc.jh.tableMgr.getChapter(cc.jh.userMgr.scenelv);
            // if(cc.jh.gameControl.gameStep() >= chapter.TotalNum){
            //     if(chapter.ID > 4001){
            //         self.scheduleOnce(function(){
            //             self.showBossComeAnim();
            //         },1);

            //         self.scheduleOnce(function(){
            //             cc.jh.sceneMgr.shake(2);
            //         },2);
            //     }
            // }
            if(window.platform){
                window.platform.postMessage(4,cc.jh.global.scoreRankKey, cc.jh.gameControl.getScore());
                self.updatePrePlayer();
            }

            if(cc.jh.userMgr.guideStep === 1 || cc.jh.userMgr.guideStep === 3 || cc.jh.userMgr.guideStep === 4){
                cc.jh.guideWnd.checkGuide();
            }
        });

        this.node.on('update_guidestep',function(data){
            if(cc.jh.userMgr.guideStep === 2){
                cc.jh.guideWnd.checkGuide();
                self.btn_Invite.getChildByName("efx").active = true;
            }
        });

        this.node.on('game_newfriend',function(data){
            self.updateInviteInfo();
        });
        
    },

    updatePrePlayer(){
        if(window.platform){
            this._preplayerview.active = true;
            this._preplayerviewSub._updateInterval = 1 / 60;
            this._preplayerviewSub.enabled = true;
            let width = this._preplayerview.width;
            let height = this._preplayerview.height;
            window.platform.updateRankPreUser(cc.jh.global.scoreRankKey,cc.jh.userMgr.openId,width,height, cc.jh.gameControl.getScore());
            var self = this;
            setTimeout(() => {
                self._preplayerviewSub.enabled = false;
                self._preplayerviewSub.update();
            }, 3000);
        }
        else{
            this._preplayerview.active = false;
        }
    },

    stopPrePlayerSub:function(){
        if(window.platform){
            //this._preplayerview.active = false;
            this._preplayerviewSub.enabled = false;
            this._preplayerviewSub._updateInterval = 100000;
        }
    },

    updatePrePlayerSub:function(){
        if(window.platform){
            if(!this._preplayerview.active){
                this.updatePrePlayer();
            }
            else{
                this._preplayerviewSub._updateInterval = 1 / 60;
                this._preplayerviewSub.update();
            }
        }
    },

    updateContent(){
        this.updateCoins();
        this.updateHp();
        this.updateScore();
        this.updateGameStep();
        this.updateInviteInfo();
    },

    updateInviteInfo(){
        var friendNum = cc.jh.userMgr.friends ? cc.jh.userMgr.friends.length : 0;
        this.lb__invite.active = friendNum <= 0;
        this.lb__inviteValue.node.active = friendNum > 0;
        if(friendNum >= 5){
            this.lb__inviteValue.string = "金币收益+5%\n攻击+5%\n暴击+2.5%\n暴击伤害+2.5%";
        }
        else if(friendNum >= 4){
            this.lb__inviteValue.string = "金币收益+2.5%\n攻击+2.5%\n暴击+2.5%\n暴击伤害+2.5%";
        }
        else if(friendNum >= 3){
            this.lb__inviteValue.string = "金币收益+2.5%\n攻击+2.5%\n暴击+2.5%";
        }
        else if(friendNum >= 2){
            this.lb__inviteValue.string = "金币收益+2.5%\n攻击+2.5%";
        }
        else if(friendNum >= 1){
            this.lb__inviteValue.string = "金币收益+2.5%";
        }
        this.lb_inviteAdd.active = friendNum < 5;
        this.lb__inviteValue.node.x = friendNum < 5 ? -39 : 0;
        if(cc.jh.global.showFriendTips){
            if(!this.lb_inviteTips.active){
                this.lb_inviteTips.active = true;
                this.lb_inviteTips.getComponent(cc.Animation).play("ani_invite_tips");
            }
        }
        else{
            this.lb_inviteTips.active = false;
        }
    },

    showDetail(grid, pos, armyConf){

        this._detailRoot.active = true;
        this._detailRoot.setPosition(pos);

        this._sellPrice.string = '+' + armyConf.SellPrice;
        var nextConf = cc.jh.tableMgr.getArmy(armyConf.ID + 1);
        if(nextConf){
            this._upgradePrice.node.parent.active = true;
            this._upgradePrice.string = '-'  + nextConf.BuyPrice;
        }
        else{
            this._upgradePrice.node.parent.active = false;
        }
        this._sellPrice.node.parent.active = armyConf.Type != 5;
        if(armyConf.Type === 5 && cc.jh.userMgr.heros[grid] === 0){
            this._upgradePrice.node.parent.getChildByName("New Label").getComponent(cc.Label).string = "解锁";
        }
        else{
            this._upgradePrice.node.parent.getChildByName("New Label").getComponent(cc.Label).string = "升级";
        }
        this._detailRoot.armyConf = armyConf;
        this._detailRoot.armyGrid = grid;
    },

    hideDetail(){
        
        this._detailRoot.active = false;
    },

    
    updateHp(){
        this.hp.string = cc.jh.gameControl.getHp();
    },


    updateCoins(){
        this.nd_coins.string = cc.jh.utils.numberFormat(cc.jh.userMgr.coins);
    },

    updateGameStep(){
        this.gameStepNum.string = "" + cc.jh.gameControl.getChapter().Level;
    },


    updateScore(){
        this.scoreNum.string = cc.jh.gameControl.getScore();
    },


    showBossComeAnim(){
        this._bosscome.active = true;
        var anim = this._bosscome.getComponent(cc.Animation);
        if(anim){
            anim.play("boss_come");
        }
        cc.jh.audioMgr.playAudio("audio_boss");
    },

    showGameStepAnim(){
        this._steplv.string = "第" + cc.jh.gameControl.getChapter().Level + "关";
        this._step.active = true;
        var anim = this._step.getComponent(cc.Animation);
        if(anim){
            anim.play("gamescene_checkpoint");
        }
    },

    getCoinsPos(){
        return cc.jh.utils.getTargetPosByLocal(this.nd_coinsicon, this.nd_window);
    },

    onInvite: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        cc.jh.gameControl.pauseGame();
        cc.jh.global.showFriendTips = false;
        this.lb_inviteTips.active = false;
        cc.jh.inviteWnd.show();
        if(cc.jh.userMgr.guideStep === 2){
            this.btn_Invite.getChildByName("efx").active = false;
            cc.jh.userMgr.addGuideStep();
            cc.jh.guideWnd.hideGuide();
        }

        if(window.platform){
            window.platform.ald_sendEvent("邀请入口点击", {"suc": "1"});
        }
    },

    onPause: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        cc.jh.gameControl.pauseGame();
        cc.jh.pauseWnd.show();
    },

    onPrePlayer: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        if(window.platform){
            var shareData = cc.jh.global.getShareData();
            shareData.title = cc.jh.tableMgr.getGlobalValue(1210);
            window.platform.postMessage(7, cc.jh.global.scoreRankKey, {
                openid: cc.jh.userMgr.openId, 
                title: shareData.title, 
                imageUrl: shareData.imageUrl
            });

            if(window.platform){
                window.platform.ald_sendEvent("即将超越点击", {"suc": "1"});
            }
        }
    },
    
    onAddSpeed: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        var timeSclae = cc.jh.gameControl.getTimeScale();
        var sspeed = 1;
        if(timeSclae < 2){
            sspeed = 1;
            cc.jh.gameControl.setTimeScale(2);
        }
        else{
            sspeed = 2;
            cc.jh.gameControl.setTimeScale(1);
        }
        for (let index = 0; index < this.btn_speed.childrenCount; index++) {
            this.btn_speed.children[index].active = this.btn_speed.children[index].name == "speed" + sspeed;
        }
    },

    onSetting: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        cc.jh.gameControl.pauseGame();
        cc.jh.settingWnd.show();
    },

    onRemarkWindow: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        cc.jh.gameControl.pauseGame();
        cc.jh.RemarkWindow.show();

        if(window.platform){
            window.platform.ald_sendEvent("主界面说明按钮点击", {"suc": "1"});
        }
    },

    onTroopSell: function(event) {
        cc.jh.audioMgr.playAudio("audio_click");
        var armyConf = this._detailRoot.armyConf;
        var armyGrid = this._detailRoot.armyGrid;
        if(armyConf){
            var armyUnit = cc.jh.gameControl.getArmyUnitByGrid(armyGrid);
            if(armyUnit){
                cc.jh.userMgr.addCoins(armyConf.SellPrice);
                cc.jh.userMgr.setArmy(armyGrid, 0);
                armyUnit.setState(2);
                armyUnit.destroySelf();
            }
        }
        this.hideDetail();
    },

    onArmyUpgrade: function(event) {
        
        cc.jh.audioMgr.playAudio("audio_click");
        var armyConf = this._detailRoot.armyConf;
        var armyGrid = this._detailRoot.armyGrid;
        var nextConf = cc.jh.tableMgr.getArmy(armyConf.ID + 1);
        if(armyConf.Type === 5 && cc.jh.userMgr.heros[armyGrid] === 0){
            nextConf = armyConf;
        }
        if(nextConf){
            if(cc.jh.userMgr.coins < nextConf.BuyPrice){
                cc.jh.TipsWindow.showTip("金币不足....");
                return;
            }

            if(armyConf.Type != 5){
                var hpRatio = 1;
                if(armyConf){
                    var armyUnit = cc.jh.gameControl.getArmyUnitByGrid(armyGrid);
                    if(armyUnit){
                        hpRatio = armyUnit.getHpRatio();
                        armyUnit.setState(2);
                        armyUnit.destroySelf();
                    }
                    else{
                        this.hideDetail();
                        return;
                    }
                }

                cc.jh.gameControl.createDroop(armyGrid, nextConf, null, hpRatio);
            }
            else{
                cc.jh.gameControl.upgradeHeros(nextConf, armyGrid);

                if(window.platform){
                    window.platform.ald_sendEvent("英雄升级", {"suc": nextConf.ID + ""});
                }
            }

            cc.jh.userMgr.addCoins(-nextConf.BuyPrice);
        }
        this.hideDetail();
    },

    
    showDesc(pos, content){
        this._descRoot.active = true;
        this._descRoot.setPosition(pos);
        this._descContent.string = content;
    },

    hideDesc(){
        this._descRoot.active = false;
    },


});
