var Global = cc.Class({
    statics: {
        sellRatio:0,
        friendRatio:0,
        enemySpeed:0,
        scoreRankKey:"score",
        fetchofflinecoins:false,
        buyarmylv: 4,
        initCoins:0,
        initHp:0,
        maxofflinetimes:7200000,   //2小时
        invitearmytime:300000,      //5分钟
        skilltime:30000,
        roulettetime:30000,
        dropcointime:30000,        //5分钟
        dropcoinval:2,
        addatktime:30000,          //5分钟
        addatkval:2,
        addatkdutime:20,
        addspeedtime:30000,        //5分钟
        addspeedval:2,
        addatkcdtime:30000,        //5分钟
        addatkcddutime:20,
        addatkcdval:2,
        sharetime:0,                //分享时间
        sharesucces:false,             //分享是否成功
        sharefailnum:0,
        sharecount:0,               //分享次数
        videolimit:false,           //视频次数上限
        videotime:0,                //视频时间
        activevideolv:4004,
        showcollectmingame:true,    //显示收藏小程序
        fetchcollectmingame:false,  
        showfloating:true,          //显示浮窗
        fetchshowfloating:false,  
        firstSubscribe: true, 
        showFriendTips: false,

        vibrateshort:1,      //短频震动
        vibratelong:1,       //长屏震动

        init:function(){    
            this.sellRatio = cc.jh.tableMgr.getGlobalValue(1001);
            this.friendRatio = cc.jh.tableMgr.getGlobalValue(1002);
            this.enemySpeed = cc.jh.tableMgr.getGlobalValue(1003);
            this.enemySpeed = cc.jh.tableMgr.getGlobalValue(1003);
            this.invitearmytime = cc.jh.tableMgr.getGlobalValue(1004) * 1000;
            this.skilltime = cc.jh.tableMgr.getGlobalValue(1005) * 1000;
            this.roulettetime = cc.jh.tableMgr.getGlobalValue(1006) * 1000;
            this.addspeedval = cc.jh.tableMgr.getGlobalValue(1007);
            this.addspeedtime = cc.jh.tableMgr.getGlobalValue(1008) * 1000;
            this.addatkval = cc.jh.tableMgr.getGlobalValue(1009);
            this.addatktime = cc.jh.tableMgr.getGlobalValue(1008) * 1000;
            this.addatkdutime = cc.jh.tableMgr.getGlobalValue(1021) * 1000;
            this.dropcoinval = cc.jh.tableMgr.getGlobalValue(1011);
            this.dropcointime = cc.jh.tableMgr.getGlobalValue(1012) * 1000;
            this.addatkcdval = cc.jh.tableMgr.getGlobalValue(1013);
            this.addatkcdtime = cc.jh.tableMgr.getGlobalValue(1010) * 1000;
            this.addatkcddutime = cc.jh.tableMgr.getGlobalValue(1014) * 1000;

            this.initCoins = cc.jh.tableMgr.getGlobalValue(1015);
            this.initHp = cc.jh.tableMgr.getGlobalValue(1016);

            var collectmingame = cc.jh.localDataMgr.getData("collectmingame");
            if(collectmingame){
                this.showcollectmingame = false;
            }

            var showfloating = cc.jh.localDataMgr.getData("showfloating");
            if(showfloating){
                this.showfloating = false;
            }

            var vibratelong = cc.jh.localDataMgr.getData("vibratelong");
            if (vibratelong != null && cc.js.isNumber(vibratelong)) {
                this.vibratelong = parseInt(vibratelong);
            }
        },

        getVideoReward:function(adUnitId, callback, cancel, addprivilege = true, useshare = false){
            console.log("getVideoReward,share="+useshare);
            if(window.platform){
                if(window.platform.isSupportVideoAd() && !cc.jh.global.videolimit && !useshare){
                    cc.jh.audioMgr.pauseBGM();
                    cc.jh.gameControl.pauseGame();

                    window.platform.ald_sendEvent("视频播放调用", { "suc": adUnitId });

                    cc.jh.global.videotime = new Date().getTime();
                    window.platform.showVideoAd(
                        function(){
                            if(window.djssdk){
                                window.djssdk.adstongji("video","click");
                            }
                        },
                        function(){
                            if(callback){
                                callback();
                            }
                            if(addprivilege){
                                cc.jh.userMgr.addPrivilegeTime(new Date().getTime() - cc.jh.global.videotime);
                            }

                            cc.jh.audioMgr.resumeBGM();
                            cc.jh.gameControl.resumeGame();

                            window.platform.ald_sendEvent("视频播放完成", { "suc": adUnitId });

                            if(window.djssdk){
                                window.djssdk.adstongji("video","finish");
                            }
                        },
                        function(res){
                            cc.jh.audioMgr.resumeBGM();
                            cc.jh.gameControl.resumeGame();
                            cc.jh.global.getShareReward(callback);
                            
                            cc.jh.global.videolimit = true;
                            //cc.jh.TipsWindow.showTip("今日视频次数已达到上限");

                            window.platform.ald_sendEvent("视频播放异常", { "suc": adUnitId });
                        },
                        function(){
                            if(cancel){
                                cancel();
                            }

                            cc.jh.audioMgr.resumeBGM();
                            cc.jh.gameControl.resumeGame();

                            window.platform.ald_sendEvent("视频播放取消", { "suc": adUnitId });
                        })
                }
                else{
                    if(cc.jh.global.sharecount > 5){
                        cc.jh.TipsWindow.showTip("分享次数已达到上限");
                    }
                    else{
                        cc.jh.global.getShareReward(callback);
                    }
                }
            }
            else{
                if(callback){
                    callback();
                }
            }
        },

        getShareReward:function(callback, oncancel){
            cc.jh.global.sharesucces = true;
            cc.jh.global.sharetime = new Date().getTime();

            if(window.platform){
                var shareData = this.getShareData();
                window.platform.shareAppMessage(shareData.title, shareData.imageUrl, shareData.query);

                setTimeout(() => {
                    if(!cc.jh.global.sharesucces && cc.jh.global.sharefailnum < 2){
                        cc.jh.global.sharefailnum += 1;
                        cc.jh.TipsWindow.showTip("分享不成功，请分享到不同的群");
                        if(oncancel){
                            oncancel();
                        }
                    }
                    else{
                        if(cc.jh.global.sharefailnum === 2){
                            cc.jh.TipsWindow.showTip("下次记得要分享到微信群哦！");
                        }
                        cc.jh.global.sharefailnum = 0;
                        if(cc.jh.global.videolimit){
                            cc.jh.global.sharecount += 1;
                        }
                        if(callback){
                            callback();
                        }
                    }
                }, 2500);
            }
            else{
                if(callback){
                    callback();
                }
            }
        },

        setVibratelong(active){
            this.vibratelong = active;

            cc.jh.localDataMgr.setData("vibratelong", active);
        },

        getShareData(){
            return {
                title :"末日来袭！你能抵挡几波丧尸？",
                imageUrl : 'https://hd-wechatgame.oss-cn-shanghai.aliyuncs.com/legdys/mrlx-other/share1.png',
                query: { inviteCode: cc.jh.userMgr.inviteCode }
            }
        }
    },
});
