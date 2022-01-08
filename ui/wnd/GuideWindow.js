var Windows = require("./Windows");
cc.Class({
    extends: Windows,

    properties: {
        _nd_guideroot:null,
        _nd_guidehandroot:null,
        _nd_guidehand:null,
        _guidehandanim:null,
        _handlight:null,
        _handfinger:null,
        _guidetips:null,
        _guidetipslabel:null,
        _armyclone:null,
        _bool_showguide:false,
    },

    onLoad () {
        this.selfPreName = "GuideWindow";
        this.windowType = 1;
        this.layerType = 1;
        this.aniType = 1;
        this.checkWindow();
    },

    initViewInfo(){
        this._nd_guideroot = this.nd_window.getChildByName("guidenode");
        this._nd_guidehandroot = this.nd_window.getChildByName("guidehand");
        this._nd_guidehand = this._nd_guidehandroot.getChildByName("hand");
        this._guidehandanim = this._nd_guidehand.getComponent(cc.Animation);
        this._handlight = this._guidehandanim.node.getChildByName("circle");
        this._handfinger = this._guidehandanim.node.getChildByName("icon_finger_1");
        this._guidetips = this.nd_window.getChildByName("guidetips");
        this._guidetipslabel = this._guidetips.getChildByName("label").getComponent(cc.Label);

        this._nd_guideroot.active = false;
        this._nd_guidehandroot.active = false;
        this._guidetips.active = false;
        setTimeout(() => {
            cc.jh.guideWnd.checkGuide();
        }, 1500);
    },

    checkGuide(){
        this._nd_guideroot.active = false;
        this._nd_guidehandroot.active = false;
        this._guidetips.active = false;
        this._nd_guidehandroot.parent = this.nd_window;
        var guide = cc.jh.userMgr.guideStep;
        this._bool_showguide = false;
        if(guide === 0 && cc.jh.gameControl.getChapter().Level === 1){
            this._bool_showguide = true;
            var uiNode = cc.find("Canvas/MianLayer/Game/buyarmys/buyarmy2");
            var beginPos = cc.jh.utils.getTargetPosByLocal(uiNode, this._nd_guideroot);
            var endPos = cc.jh.gameControl.getGridPos(1);
            endPos.x -= 20;
            beginPos.x -= 10;
            beginPos.y -= 50;
            this._nd_guidehandroot.active = true;
            this._handlight.active = true;
            this._nd_guidehand.rotation = 35;
            this._nd_guidehandroot.setPosition(beginPos);
            this._guidetips.active = true;
            this._guidetips.setPosition(cc.v2(0, 100));
            this._guidetipslabel.string = cc.jh.tableMgr.getGlobalValue(1101);

            this._nd_guidehandroot.stopAllActions();
            var repeat = cc.repeatForever(
                cc.sequence(
                    cc.moveTo(1, cc.v2(endPos.x, endPos.y)),
                    cc.delayTime(0.5),
                    cc.callFunc(function(hand){
                        hand.setPosition(beginPos);
                    },this, this._nd_guidehandroot),
                ));
            this._nd_guidehandroot.runAction(repeat);
        }
        else  if(guide === 1 && cc.jh.gameControl.getChapter().Level === 2){
            cc.jh.gameControl.pauseGame();
            this._bool_showguide = true;
            // var uiNode = cc.find("Canvas/MianLayer/Game/buyarmys/buyarmy1");
            // var beginPos = cc.jh.utils.getTargetPosByLocal(uiNode, this._guideroot);
            // var endPos = cc.jh.gameControl.getGridPos(21);
            // endPos.x -= 20;
            // beginPos.x -= 10;
            // beginPos.y -= 50;
            // this._guidehandroot.active = true;
            // this._handlight.active = true;
            // this._guidehand.rotation = 35;
            // this._guidehandroot.setPosition(beginPos);
            this._guidetips.active = true;
            this._guidetips.setPosition(cc.v2(100, 100));
            this._guidetipslabel.string = cc.jh.tableMgr.getGlobalValue(1102);

            // this._guidehandroot.stopAllActions();
            // var repeat = cc.repeatForever(
            //     cc.sequence(
            //         cc.moveTo(1, cc.v2(endPos.x, endPos.y)),
            //         cc.delayTime(0.5),
            //         cc.callFunc(function(hand){
            //             hand.setPosition(beginPos);
            //         },this, this._guidehandroot),
            //     ));
            // this._guidehandroot.runAction(repeat);
        }
        else if(guide === 2){
            this._bool_showguide = true;
            var uiNode = cc.find("Canvas/MianLayer/MainWnd/top/invite");
            var beginPos = cc.jh.utils.getTargetPosByLocal(uiNode, this._nd_guideroot);
            beginPos.x += 120;
            beginPos.y += -150;
            this._nd_guidehandroot.active = true;
            this._handlight.active = true;
            this._nd_guidehand.rotation = -35;
            this._guidehandanim.play("Novice");
            this._nd_guidehandroot.setPosition(beginPos);
            this._guidetips.active = true;
            this._guidetips.setPosition(cc.v2(beginPos.x + 50, beginPos.y - 90));
            this._guidetipslabel.string = cc.jh.tableMgr.getGlobalValue(1103);
        }
        else if(guide === 3){
            this._bool_showguide = true;
            var uiNode = cc.find("Canvas/MianLayer/Game/heros/hero_a2");
            var beginPos = cc.jh.utils.getTargetPosByLocal(uiNode, this._nd_guideroot);
            beginPos.x += 150;
            beginPos.y += -100;
            this._guidetips.active = true;
            this._guidetips.setPosition(cc.v2(100, 170));
            this._guidetipslabel.string = cc.jh.tableMgr.getGlobalValue(1104);
            this._nd_guidehandroot.parent = this.nd_window;
            this._nd_guidehandroot.active = true;
            this._handlight.active = true;
            this._nd_guidehand.rotation = -30;
            this._guidehandanim.play("Novice");
            this._nd_guidehandroot.setPosition(beginPos);
        }
        else  if(guide === 4 && cc.jh.gameControl.getChapter().Level === 5){
            // var grids = [17,22,27,32,37,12,7,2];
            // var grid = -1;
            // for (let index = 0; index < grids.length; index++) {
            //     if(!cc.jh.userMgr.army[grids[index]]){
            //         grid = grids[index];
            //         break;
            //     }
            // }
            // if(grid == -1){
            //     return;
            // }
            // this._showguide = true;
            // this._guidehandanim.stop("Novice");
            // this._guidehandanim.node.getChildByName("icon_finger_1").setPosition(cc.v2(-6.1, 2.2));
            // var uiNode = cc.find("Canvas/MianLayer/Game/buyarmys/buyarmy3");
            // var beginPos = cc.jh.utils.getTargetPosByLocal(uiNode, this._guideroot);
            // var endPos = cc.jh.gameControl.getGridPos(grid - 1);
            // endPos.x -= 20;
            // beginPos.x -= 10;
            // beginPos.y -= 50;
            // this._guidehandroot.active = true;
            // this._handlight.active = true;
            // this._guidehand.rotation = 35;
            // this._guidehandroot.setPosition(beginPos);
            cc.jh.gameControl.pauseGame();
            this._guidetips.active = true;
            this._guidetips.setPosition(cc.v2(50, 170));
            this._guidetipslabel.string = cc.jh.tableMgr.getGlobalValue(1105);

            // this._guidehandroot.stopAllActions();
            // var repeat = cc.repeatForever(
            //     cc.sequence(
            //         cc.moveTo(1, cc.v2(endPos.x, endPos.y)),
            //         cc.delayTime(0.5),
            //         cc.callFunc(function(hand){
            //             hand.setPosition(beginPos);
            //         },this, this._guidehandroot),
            //     ));
            // this._guidehandroot.runAction(repeat);
        }else if(guide === 5){

        }
    },

    hideGuide(){
        this._nd_guideroot.active = false;
        this._nd_guidehandroot.active = false;
        this._guidetips.active = false;
        this._bool_showguide = false;
        this._nd_guidehandroot.stopAllActions(); 
    },

    hideHand(){
        if(this._bool_showguide){
            return;
        }
        this._nd_guidehandroot.active = false;
        this._nd_guidehandroot.stopAllActions(); 
    },
});
