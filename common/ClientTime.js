var ClientTime = cc.Class({
    statics: {
        differentMs:0,      //毫秒

        setDifferentMs(diff){
            this.differentMs = diff;
        },

        updateDifferentMs(serverts){
            this.differentMs = this.getDifferentTime(new Date().getTime(),serverts);
        },
    
        getDifferentTime:function(localTime, servTime){
            var difference = servTime - localTime;
            return difference;
        },

        
        getNowDate(){
            return this.getLocalDateByServer().getDate();
        },
    
        getLocalTimeByServer:function(){
            var now = new Date();
            return now.getTime() + this.differentMs;
        },
    
        getLocalDateByServer(){
            var ts = this.getLocalTimeByServer();
            return new Date(ts);
        },


        getTodayDate:function(timestr){
            var datas = timestr.split(':');
            var curTime = new Date(this.getLocalTimeByServer() * 1000);
            if(datas && datas.length >= 3){
                curTime.setHours(datas[0]);
                curTime.setMinutes(datas[1]);
                curTime.setSeconds(datas[2]);
            }
            return curTime;
        }
    }
})
