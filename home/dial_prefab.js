// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        frame_node:{
            default: null,
            type: cc.Node
        },
        frame_nodel:{
            default: null,
            type: cc.Node
        },
        frame_nodez:{
            default: null,
            type: cc.Node
        },
        frame_nodeh:{
            default: null,
            type: cc.Node
        },
        item_sp:{
            default: null,
            type: cc.Sprite
        },
        item_num:{
            default: null,
            type: cc.Label
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    changeInfo(n,b,sp,n2){
        this.frame_nodel.active = false;
        this.frame_nodez.active = false;
        this.frame_nodeh.active = false;
        if(parseInt(n2) == 2){
            this.frame_nodez.active = true;
        }else if(parseInt(n2) == 3){
            this.frame_nodeh.active = true;
        }else{
            this.frame_nodel.active = true;
        }
        this.item_num.string = n;
        this.frame_node.active = b;
        var self = this;
        cc.loader.loadRes("textures/game/icons/" + sp, cc.SpriteFrame, function (err, res) {
            if (!err) {
                if(self.item_sp){
                    self.item_sp.spriteFrame = res;
                }
            }
        });
    },

});
