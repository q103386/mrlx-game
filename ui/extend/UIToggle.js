cc.Class({
    extends: cc.Component,

    properties: {
        background:cc.Node,
        checkmark:cc.Node,

        _isChecked: false,
        isChecked: {
            get: function () {
                return this._isChecked;
            },
            set: function (value) {
                this._isChecked = value;
                this.updateContent();
            }
        },
    },
    
    updateContent(){
        this.background.active = !this._isChecked;
        this.checkmark.active = this._isChecked;
    }

});
