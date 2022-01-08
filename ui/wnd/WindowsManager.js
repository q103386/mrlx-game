cc.Class({
    extends: cc.Component,

    properties: {
        _curWnd:null,
        _loadQuenes:null,
    },

    // use this for initialization
    onLoad: function () {
        if(cc.jh == null){
            cc.jh = {};
        }
        cc.jh.WindowsMgr = this;
        this._loadQuenes = {};
    },

    setCurWnd(wnd){
        this._curWnd = wnd;
    },

    changeMaskLine(ang,w){
        this.maskLine.angle = -ang -270;
        this.maskLine.width = w;
    },

    changeKnifeAng(ang){
        this.nd_knife.angle = -ang
    },


    knifeMove(p1,p2){
        var self = this;
        var cb =  cc.callFunc(function(target, score) {
            if(self.nd_knife){
                self.knifeMovebool = false;
                self.nd_knife.destroy();
            }          
        }, this, null)
        var action = cc.sequence(cc.moveTo(0.5, p2), cb);
        
        this.nd_knife.runAction(action);
    },

    greatBlock(block, a) {
        if (block && a[0]) {
            block.moveTo(a[0].x, a[0].y);
            for (let i = 1; i < a.length; i++) {
                block.lineTo(a[i].x, a[i].y);
            }
            block.close();
            // block.length = 5;
            block.fillColor = cc.Color.BLOCK;

            block.fill();
            block.lineWidth = 3;          
            block.strokeColor = cc.Color.BLOCK;
            block.stroke();
        }
    },

    createWindow(name,layer,callback){
        if(this._loadQuenes[name]){
            return;
        }
        this._loadQuenes[name] = 1;

        console.log(name);
        var self = this;
        cc.jh.resourceMgr.loadWindows(name,function(prefab){
            if(prefab == null){
                console.error("can not find windows, name = "+ name);
                return null;
            }
            delete self._loadQuenes[name];

            let wnd = cc.instantiate(prefab);
            var parent = null;
            if(layer === 1){
                parent = self.node.getChildByName("MianLayer");
            }
            else if(layer === 2){
                parent = self.node.getChildByName("CommonLayer");
            }
            parent.addChild(wnd);
            wnd.x = 0;
            wnd.y = 0;
            console.log("windows createWindow name = "+ name);
            if(callback){
                callback(wnd);
            }
        })
    },

  
});
