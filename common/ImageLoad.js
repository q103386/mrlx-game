
cc.Class({
    extends: cc.Component,

    properties: {
        _sprite:null,
    },

    onLoad () {
        this._sprite = this.node.getComponent(cc.Sprite);
    },

    setImage(spriteFrame, maxwh){
        if(this._sprite){
            this._sprite.spriteFrame = spriteFrame;
            if(maxwh != null){
                if(this.node.width > maxwh){
                    this.node.setScale(maxwh / this.node.width);
                }
                else if(this.node.height > maxwh){
                    this.node.setScale(maxwh / this.node.height);
                }
            }
        }
    },

    loadImage(url, maxwh, size){
        if(url == null || (url != null && url.length <= 5)){
            return;
        }
        this.url = url;
        if(this._sprite == null){
            this._sprite = this.node.getComponent(cc.Sprite);
        }

        if (url && !/png$/.test(url)) {
            var endindex = url.lastIndexOf('/');
            url = url.substr(0, endindex) + '/64';
        }

        var self = this;
        cc.jh.resourceMgr.loadRemoteImage(url, function(spriteFrame){
            if(self._sprite){
                self._sprite.spriteFrame = spriteFrame;
                if(maxwh != null){
                    if(self.node.width > maxwh){
                        self.node.setScale(maxwh / self.node.width);
                    }
                    else if(self.node.height > maxwh){
                        self.node.setScale(maxwh / self.node.height);
                    }
                }
                else{
                    if(size){
                        self.node.width = size.width;
                        self.node.height = size.height;
                    }
                }
            }
        });
    },
});
