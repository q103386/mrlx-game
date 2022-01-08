

cc.Class({
    extends: cc.Component,

    properties: {
        freeBt:{
            default: null,
            type: cc.Node
        },
        liveBt:{
            default: null,
            type: cc.Node
        },
        freeNum:{
            default: null,
            type: cc.Label
        },
        liveNum:{
            default: null,
            type: cc.Label
        },

        itemContent:{
            default: null,
            type: cc.Node
        },
        itemPrefab:{
            default: null,
            type: cc.Prefab
        },
        // tc_node:{
        //     default: null,
        //     type: cc.Node
        // },
        // tc_t_1:{
        //     default: null,
        //     type: cc.Node
        // },
        // tc_t_2:{
        //     default: null,
        //     type: cc.Node
        // },
        // tc_t_3:{
        //     default: null,
        //     type: cc.Node
        // },
        // tc_live_bt:{
        //     default: null,
        //     type: cc.Node
        // },
        // tc_text:{
        //     default: null,
        //     type: cc.Label
        // },
        // tc_sp:{
        //     default: null,
        //     type: cc.Sprite
        // },
        // tc_X:{
        //     default: null,
        //     type: cc.Node
        // },
        room_node:{
            default: null,
            type: cc.Node
        },
        off_bt:{
            default: null,
            type: cc.Node
        },
        // off_bt2:{
        //     default: null,
        //     type: cc.Node
        // },
        mask2_node:{
            default: null,
            type: cc.Node
        },

        offbt_node:{
            default: null,
            type: cc.Node
        },
        offbt_node_2:{
            default: null,
            type: cc.Node
        },
    },

    init(){
        if(SDKManage.dial1 == 0){
            SDKManage.x_3 = this.room_node.x;
            SDKManage.s_x3 = this.room_node.scaleX;
            SDKManage.y_3 = this.room_node.y;
            SDKManage.s_y3 = this.room_node.scaleY;
            SDKManage.dial1 += 1;
        }
        
        this.x = SDKManage.x_3;
        this.y = SDKManage.y_3;

        this.mask2_node.active = false;
        this.mask2_node.zIndex = 99
        this.offBool = false;
        this.offTime = 0;
        //this.off_bt2.active = false;
        if(SDKManage.bannerCountBool == false){
            //this.off_bt.active = true;
            
            this.off_bt.getComponent('btnhack').nothack();
        }
        
        this.startLayer = cc.find("Canvas/Home").getComponent("startLayer");
        this.myself = cc.find("Canvas/Home").getComponent("mySelfInfo");
        this.endBool = false;
        this.endTime = 0;
        //this.tc_node.active = false;
        var self = this;
        //this.btnBool = true;
        this.time = 0;
        this.cltime = 0;
        this.beginNum = Math.floor(Math.random()*11);
        if(self.prefabArr){

        }else{
            self.prefabArr = new Array();
            self.addPrefab();
        }
        this.getDate(true);
        
        this.tc_time = 0;
        this.liveBool = true;
        // if(Main.config.mainConfig.blackTech){
        //     this.room_node.y = 25;
        // }else{
        //     this.room_node.y = 65;
        // }
        // if(SDKManage.scale_n && SDKManage.windowN != 1){
        //     this.room_node.scaleX = this.room_node.scaleX * SDKManage.scale_n;
        //     this.room_node.scaleY = this.room_node.scaleY * SDKManage.scale_n;
        // }
        //if(this.da){
            if(SDKManage.windowType  && SDKManage.windowType != 0){
                this.room_node.scaleX = SDKManage.s_x3 * 1.05
                this.room_node.scaleY = SDKManage.s_y3 * 1.05
                this.room_node.y = this.y  +  this.room_node.height * 0.05
                
            }
            if(this.ybool){
                this.y2 = this.room_node.y
                this.ybool = false;
            }
            
        //}
        //-250  
        if(SDKManage.bannerCountBool){
            this.room_node.y = this.y2 - 75;
            this.room_node.x = this.x - 25;
            if(this.node.getChildByName("banner_gif")){
                this.node.getChildByName("banner_gif").x =this.x - 25
            }
            this.offbt_node.x = -250;
            this.offbt_node_2.x = -250;
        }else{
            this.room_node.y = this.y2;
            this.room_node.x = this.x;
            this.offbt_node.x = 260;
            this.offbt_node_2.x = 260;
        }
        if(Main.config.mainConfig.blackTech == false){
            this.room_node.y = this.y2;
            this.room_node.x = this.x;
            this.offbt_node.x = 260;
            this.offbt_node_2.x = 260;
        }
        
    },


    openTc(){
        SDKManage.closebanner();
        
        
        this.tc_bool = true;
        //this.tc_t_1.active = true;
       // this.tc_t_2.active = true;
        var tepA = [
            {
                item_id : this.date.item_list[this.beginNum].item_id,
                item_num: this.getInfo.item_num
            }
        ]
        this.startLayer.addItemTc(tepA.length,tepA,this.node,'dialLayer','tcLiveBt','offTc',1,0)
    },

    tcLiveBt(){
       // console.log('live')
        var self = this;
        if(this.liveBool){
            this.liveBool = false;
            var adcb = function(){
                var cb = function(){
                    self.liveBool = true;
                    self.offTc();
                    
                }
                gameNet.doubleLuckDraw(cb)
            }
            var fcb = function(){
                self.liveBool = true;
            }
            SDKManage.Share('dial10',null,adcb,fcb);
        }
        
    },

    offTc(){
        //console.log('off !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        this.startLayer.addItemFly(this.date.item_list[this.beginNum].item_id)
        //SDKManage.banner();
        if(SDKManage.bannerCountBool){
            SDKManage.banner(3);
        }else{
            SDKManage.banner();
        }
        var self= this;
        self.getDate();
        this.endTime = 0;
        // this.tc_text.string = '';
        // this.tc_sp.spriteFrame = null;
        //this.tc_node.active = false;
       
        this.myself.getGold();
        this.startLayer.destroyTc();
        if(SDKManage.bannerCountBool){
            this.startLayer.randomJump(3);
        }else{
            this.startLayer.randomJump(2);
        }
        
    },

    changeBtInfo(){//item_num
        for(let i = 0; i < this.prefabArr.length; i++){
            if(this.beginNum == i){
                this.prefabArr[i].getComponent('dial_prefab').changeInfo(this.date.item_list[i].item_num,true,homeConfig.itemConfig[this.date.item_list[i].item_id].icon,this.date.item_list[i].quailty);
            }else{
                this.prefabArr[i].getComponent('dial_prefab').changeInfo(this.date.item_list[i].item_num,false,homeConfig.itemConfig[this.date.item_list[i].item_id].icon,this.date.item_list[i].quailty);
            }
        }
        
    },

    onLiveBt(){
        if(!this.btnBool){
            return;
        }
        var self = this;
        if(this.draw_uuid){
            this.btnBool = false;
            self.mask2_node.active = true;
            var adcb = function(){
                var cb = function(obj){
                    self.getInfo = obj;
                    for(let i = 0; i < self.date.item_list.length; i++){
                        if(parseInt(self.date.item_list[i].item_id) == parseInt(self.getInfo.item_id)&& (parseInt(self.date.item_list[i].item_num) == parseInt(self.getInfo.item_num))){
                            self.getNum = i;
                        }
                    }
                    self.allNum = self.qNum * 12 - self.beginNum +self.getNum;
                  //  console.log("live this.allNum,self.getNum",self.allNum,self.getNum)
                    self.startBool = true;
                }
                var fccb = function(){
                    self.btnBool = true;
                    self.mask2_node.active = false;
                }
                gameNet.getLuckDraw(self.draw_uuid,1,cb,fccb)
            }
            var fcb = function(){
                self.btnBool = true;
                self.mask2_node.active = false;
            }
            SDKManage.Share('saiqian',null,adcb,fcb);
        }else{
            var cb = function(obj2){
                self.date = obj2;
                //console.log('self.date',self.date);
                self.draw_uuid = self.date.draw_uuid;
                self.btnBool = false;
                self.mask2_node.active = true;
                var adcb = function(){
                    var cb2 = function(obj){
                        self.getInfo = obj;
                        for(let i = 0; i < self.date.item_list.length; i++){
                            if(parseInt(self.date.item_list[i].item_id) == parseInt(self.getInfo.item_id)&& (parseInt(self.date.item_list[i].item_num) == parseInt(self.getInfo.item_num))){
                                self.getNum = i;
                            }
                        }
                        self.allNum = self.qNum * 12 - self.beginNum +self.getNum;
                       // console.log("live this.allNum,self.getNum",self.allNum,self.getNum)
                        self.startBool = true;
                    }
                    var fccb = function(){
                        self.btnBool = true;
                        self.mask2_node.active = false;
                    }
                    gameNet.getLuckDraw(self.draw_uuid,1,cb2,fccb)
                }
                var fcb = function(){
                    self.btnBool = true;
                    self.mask2_node.active = false;
                }
                SDKManage.Share('saiqian',null,adcb,fcb);
            }
            gameNet.luckDrawInfo(cb);
        }
        
    },

    onStartBt(){
        if(!this.btnBool){
            return;
        }
        var self = this;
        if(this.draw_uuid){
            this.btnBool = false;
            self.mask2_node.active = true;
            var cb = function(obj){
            // console.log("???")
                self.getInfo = obj;
                for(let i = 0; i < self.date.item_list.length; i++){
                    if(parseInt(self.date.item_list[i].item_id) == parseInt(self.getInfo.item_id)&& (parseInt(self.date.item_list[i].item_num) == parseInt(self.getInfo.item_num))){
                        self.getNum = i;
                    }
                }
                self.allNum = self.qNum * 12 - self.beginNum +self.getNum;
                //("this.allNum,self.getNum",self.allNum,self.getNum)
                self.startBool = true;
                
            }
            var fcb = function(){
                self.btnBool = true;
                self.mask2_node.active = false
            }
            gameNet.getLuckDraw(this.draw_uuid,0,cb,fcb)
        }else{
            var cb = function(obj2){
                self.date = obj2;
                
                //console.log('self.date',self.date);
                self.draw_uuid = self.date.draw_uuid;
                self.btnBool = false;
                self.mask2_node.active = true;
                var cb2 = function(obj){
                // console.log("???")
                    self.getInfo = obj;
                    for(let i = 0; i < self.date.item_list.length; i++){
                        if(parseInt(self.date.item_list[i].item_id) == parseInt(self.getInfo.item_id)&& (parseInt(self.date.item_list[i].item_num) == parseInt(self.getInfo.item_num))){
                            self.getNum = i;
                        }
                    }
                    self.allNum = self.qNum * 12 - self.beginNum +self.getNum;
                   // console.log("this.allNum,self.getNum",self.allNum,self.getNum)
                    self.startBool = true;
                    
                }
                var fcb = function(){
                    self.btnBool = true;
                    self.mask2_node.active = false
                }

                //console.log("!!!!!!!!!!!",self.draw_uuid)
                gameNet.getLuckDraw(self.draw_uuid,0,cb2,fcb)
            }
            gameNet.luckDrawInfo(cb);
        }
        
        
        

    },

    addPrefab(){
        for(let i = 0; i < 12; i++){
            var newItem = cc.instantiate(this.itemPrefab);
            this.itemContent.addChild(newItem);
            if( i < 5){
                newItem.setPosition(-190 + i * 95,95)
            }else if(i == 5){
                newItem.setPosition(190,0)
            }else if( i > 5 && i< 11){
                newItem.setPosition(190 - (i - 6) * 95,-95)
            }else if(i == 11){
                newItem.setPosition(-190,0)
            }
           
            this.prefabArr.push(newItem);
        }
    },

    getDate(isT){
        var self = this;
        if(isT && self.date){
            //console.log('self.date',self.date);
            self.draw_uuid = self.date.draw_uuid;

            self.qNum = Math.floor(Math.random()*2) + 4;
            //console.log("beginN,qNum",self.beginNum,self.qNum)
            self.changeBt();
            self.changeBtInfo();
            self.btnBool = true;
            self.mask2_node.active = false;
        }else{
            var cb = function(obj){
                self.date = obj;
                self.startLayer.Dial_date = obj
                //console.log('self.date',self.date);
                self.draw_uuid = self.date.draw_uuid;
    
                self.qNum = Math.floor(Math.random()*2) + 4;
                //console.log("beginN,qNum",self.beginNum,self.qNum)
                self.changeBt();
                self.changeBtInfo();
                self.btnBool = true;
                self.mask2_node.active = false;
            }
            var ffcb = function(){
                self.cltime++
                if(self.cltime < 3){
                    self.getDate()
                }
                
            }
            gameNet.luckDrawInfo(cb,ffcb);
        }
        
    },

    onDestroy(){
        this.startLayer = null;
        this.myself = null;
    },

    changeBt(){
        this.freeNum.string = this.date.free_times;
        this.liveNum.string = this.date.video_times;
        if(parseInt(this.freeNum.string) == 0){
            this.freeBt.getComponent(cc.Button).interactable = false;
        }else{
            this.freeBt.getComponent(cc.Button).interactable = true;
        }
        if(parseInt(this.liveNum.string) == 0){
            this.liveBt.getComponent(cc.Button).interactable = false;
        }else{
            this.liveBt.getComponent(cc.Button).interactable = true;
        }
    },

    offRoom(){
        
        this.offBool = true;
        if(!this.btnBool){
            return;
        }
        this.node.active = false;
        var n2 = 0;
        var self= this;
        self.startLayer.sceneArr = [3];
        self.startLayer.openActiveScene(self.startLayer.sceneArr[0]);
        
    },


    
});
