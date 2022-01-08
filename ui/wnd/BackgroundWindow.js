cc.Class({
    extends: cc.Component,

    properties: {
        nd_window:null,

        _WndQuenes:[],
        WndInstance:null,
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        cc.jh.WindowsMgr.createWindow("BackgroundWindow",1,function(wnd){
            self.nd_window = wnd;
            self.initViewInfo();
        });
    },

    initViewInfo(){
        this.nd_window.active = false;
        cc.jh.utils.addClickEvent(this.nd_window,this.node,"BackgroundWindow","onCloseClick");
    },

    show(){
        let wndSI = this.WndInstance.nd_window.getSiblingIndex();
        this.nd_window.setSiblingIndex(wndSI);
        this.WndInstance.nd_window.setSiblingIndex(wndSI + 1);
        this.nd_window.active = true;
    },

    

    haveWindow(name){
        for (var i = 0; i < this._WndQuenes.length; i ++) {
            if(this._WndQuenes[i].selfPreName == name){
                return true;
            }
        }
        return false;
    },

    hide(){
        this.nd_window.active = false;
    },

    addWndQuene(wnd){
        this.WndInstance = wnd;
        if(!this.haveWindow(wnd.selfPreName)){
            this._WndQuenes.push(wnd);
            console.log("addWndQuene = "+ wnd.selfPreName);
        }
        this.show();
    },

    removeWndQuene(name){
        for (var i = 0; i < this._WndQuenes.length; i ++) {
            if(this._WndQuenes[i].selfPreName == name){
                this._WndQuenes.splice(i,1);
                break;
            }
        }
        console.log("removeWndQuene =" + name + "---"+ this._WndQuenes.length);
        if(this._WndQuenes.length <= 0){
            this.hide();
        }
        else{
            this.WndInstance = this._WndQuenes[this._WndQuenes.length - 1];
            this.show();
        }
    },

    onCloseClick(event) {
        if(this.WndInstance && this.WndInstance.canBack()){
            this.WndInstance.hide();
        }
    },
});
