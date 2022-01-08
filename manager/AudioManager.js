
cc.Class({
    extends: cc.Component,

    properties: {
        bgmVolume: 1.0,
        sfxVolume: 0.5,
        bgmAudioID: -1,
    },

    onLoad: function() {
        var t = cc.jh.localDataMgr.getData("bgmVolume");
        if (t) {
            this.bgmVolume = parseFloat(t);
        }

        var t = cc.jh.localDataMgr.getData("sfxVolume");
        if (t) {
            this.sfxVolume = parseFloat(t);
            if(this.sfxVolume > 0){
                this.sfxVolume = 0.5;
            }
        }
    },

    playAudio:function(audioUrl) {
        //console.log("playAudio----->audioUrl = " + audioUrl + ",isloop = " + false + ",sfxVolume = " + this.sfxVolume);
        if (this.sfxVolume > 0) {
            var self = this;
            cc.jh.resourceMgr.loadAudio(audioUrl,function(clip){
                var audioId = cc.audioEngine.play(clip, false, self.sfxVolume);
            })
        }
    },

    playLoopAudio:function(audioUrl, callback) {
        //console.log("playAudio----->audioUrl = " + audioUrl + ",isloop = " + false + ",sfxVolume = " + this.sfxVolume);
        if (this.sfxVolume > 0) {
            var self = this;
            cc.jh.resourceMgr.loadAudio(audioUrl,function(clip){
                var audioId = cc.audioEngine.play(clip, true, self.sfxVolume);
                if(callback){
                    callback(audioId);
                }
            })
        }
    },

    playBGM:function(audioUrl) {
        console.log("playBGM----->audioUrl = " + audioUrl);
        if (this.bgmAudioID >= 0) {
            this.stopBGM();
        }
        if (this.bgmVolume > 0) {
            var self = this;
            cc.jh.resourceMgr.loadAudio(audioUrl,function(clip){
                self.bgmAudioID = cc.audioEngine.playMusic(clip, true);
            })
        }
    },

    pauseBGM(){
        console.log("pauseBGM");
        cc.audioEngine.pauseMusic();
    },

    resumeBGM(){
        console.log("resumeBGM");
        cc.audioEngine.resumeMusic();
    },

    stopAudio:function(audioId){
        cc.audioEngine.stop(audioId);
    },

    startRain(){
        this.particleNode.active = false;
        this.openRoom.active = false;
        this.rainRoom.active = true;
        this.downTime_lb.node.active = false;
        this.ready_node.active = true;
        SDKManage.closebanner();
        
        this.nowNum = 0;
        this.barNum_lb.string = this.nowNum+ '/'+ home_config.parameterConfig['red_num'].param_value;
        this.downTime_lb.string = home_config.parameterConfig['red_time'].param_value;
        this.bar_node.getComponent(cc.ProgressBar).progress = this.nowNum /  parseInt(home_config.parameterConfig['red_num'].param_value);
        this.ready_text1.active = false;
        this.ready_text2.active = false;
        this.readyBool = true;
        this.readyTime = 0;
        //this.downBool = true;
        this.downTime = 0;
    },

    
    stopBGM:function(){
        console.log("stopBGM");
        cc.audioEngine.stopMusic();
        this.bgmAudioID = -1;
    },


    setAudioVolume(volume){
        this.sfxVolume = volume;
        
        cc.jh.localDataMgr.setData("sfxVolume", volume);
    },

    pauseSFX(audioid){
        cc.audioEngine.pause(audioid);
    },

    addLine(p1,p2){
        //console.log("pos",p1,p2)
        //console.log("convertToNodeSpaceAR",)
        p1 = this.node.convertToNodeSpaceAR(p1)
        p2 = this.node.convertToNodeSpaceAR(p2)
        this.draw = this.node.getComponent(cc.Graphics);
        this.draw.clear();         
        this.draw.moveTo(p1.x, p1.y);
        this.draw.lineTo(p2.x, p2.y);
        this.draw.stroke();
    },

    resumeSFX(audioid){
        cc.audioEngine.resume(audioid);
    },

    setBGMVolume(volume, sync = true){
        this.bgmVolume = volume;
        cc.audioEngine.setMusicVolume(volume);

        if(volume > 0){
            this.resumeBGM();
        }
        else{
            this.pauseBGM();
        }

        if(sync){
            cc.jh.localDataMgr.setData("bgmVolume", volume);
        }
    },
});
