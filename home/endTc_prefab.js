

cc.Class({
    extends: cc.Component,

    properties: {
        cup_sp:{
            default: null,
            type: cc.Sprite
        },
        item_sp:{
            default: null,
            type: cc.Sprite
        },
        item_num:{
            default: null,
            type: cc.Label
        },
        sj_num:{
            default: null,
            type: cc.Label
        },
    },

    onShare(){
        SDKManage.Share('reward_share',null);
    },

    offRoom(){
        this.myself = cc.find("Canvas/Home").getComponent("mySelfInfo");
        this.startLayer = cc.find("Canvas/Home").getComponent("startLayer");
        //SDKManage.banner();
        this.node.active = false;
        this.startLayer.addItemFly(this.id);
        this.myself.getGold();
    },

    onDestroy(){
        this.startLayer = null;
        this.myself = null;
    },

    changeInfo(cubSp,itemSp,num,sj,id){
        var self = this;
        this.id = id;
        this.item_num.string = num;
        this.sj_num.string = 'S' + sj + '赛季结算';
        cc.loader.loadRes("textures/game/icons/rankCub"+ cubSp, cc.SpriteFrame, function (err, res) {
            if (!err) {
                if(self.cup_sp){
                    self.cup_sp.spriteFrame = res;
                }
            }
        });
        cc.loader.loadRes("textures/game/icons/"+ itemSp, cc.SpriteFrame, function (err, res) {
            if (!err) {
                if(self.item_sp){
                    self.item_sp.spriteFrame = res;
                    SDKManage.closebanner();
                }
            }
        });
    },



    // update (dt) {},
});
