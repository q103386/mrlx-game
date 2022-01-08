var Army = require("TroopData").TroopData;
var Bullet = require("BulletData").BulletData;
var Chapter = require("ChapterData").ChapterData;
var Global = require("GlobalData").GlobalData;
var Enemy = require("EnemyData").EnemyData;
var Buff = require("BuffData").BuffData;
var Skill = require("SkillData").SkillData;
//var Winner = require("TableWinner").TableWinner;

function init(){
    if(Army == null){
        console.warn("not find by table conf, name = Army");
    }
    if(Bullet == null){
        console.warn("not find by table conf, name = Bullet");
    }
    if(Chapter == null){
        console.warn("not find by table conf, name = Chapter");
    }
    if(Global == null){
        console.warn("not find by table conf, name = Global");
    }
    if(Enemy == null){
        console.warn("not find by table conf, name = Enemy");
    }
    if(Buff == null){
        console.warn("not find by table conf, name = Buff");
    }
    if(Skill == null){
        console.warn("not find by table conf, name = Skill");
    }
}


function getAllArmy(){
    if(Army != null){
        return Army;
    }
    console.warn("not find table conf---------->table name = Army");
    return null;
}


function getAllWinner(){
    if(Winner != null){
        return Winner;
    }
    console.warn("not find table conf---------->table name = Winner");
    return null;
}

function getArmy(id){
    if(Army != null){
        for(var i = 0; i < Army.length; i++){ 
            if(Army[i].ID === id){
                return Army[i];
            }
        }
    }
    console.warn("not find table conf---------->table name = Army ,id = "+ id);
    return null;
}

function getBuff(id){
    if(Buff != null){
        for(var i = 0; i < Buff.length; i++){ 
            if(Buff[i].ID === id){
                return Buff[i];
            }
        }
    }
    console.warn("not find table conf---------->table name = Buff ,id = "+ id);
    return null;
}

function getSkill(id){
    if(Skill != null){
        for(var i = 0; i < Skill.length; i++){ 
            if(Skill[i].ID === id){
                return Skill[i];
            }
        }
    }
    console.warn("not find table conf---------->table name = Skill ,id = "+ id);
    return null;
}

function getAllSkill(){
    if(Skill != null){
        return Skill;
    }
    console.warn("not find table conf---------->table name = Skill");
    return null;
}

function getEnemy(id){
    if(Enemy != null){
        for(var i = 0; i < Enemy.length; i++){ 
            if(Enemy[i].ID === id){
                return Enemy[i];
            }
        }
    }
    console.warn("not find table conf---------->table name = Enemy ,id = "+ id);
    return null;
}

function getBullet(id){
    if(Bullet != null){
        for(var i = 0; i < Bullet.length; i++){ 
            if(Bullet[i].ID === id){
                return Bullet[i];
            }
        }
    }
    console.warn("not find table conf---------->table name = Bullet ,id = "+ id);
    return null;
}

function getChapter(id){
    if(Chapter != null){
        for(var i = 0; i < Chapter.length; i++){ 
            if(Chapter[i].ID === id){
                return Chapter[i];
            }
        }
    }
    console.warn("not find table conf---------->table name = Chapter ,id = "+ id);
    return null;
}

function getGlobalValue(id){
    if(Global != null){
        for(var i = 0; i < Global.length; i++){ 
            if(Global[i].ID === id){
                return Global[i].Value;
            }
        }
    }
    console.warn("not find table conf---------->table name = Global,id = "+ id);
    return null;
}

exports.init = init;
exports.getAllArmy = getAllArmy;  
exports.getArmy = getArmy;    
exports.getEnemy = getEnemy;          
exports.getChapter = getChapter;
exports.getBullet = getBullet;
exports.getGlobalValue = getGlobalValue;
exports.getAllSkill = getAllSkill;
exports.getSkill = getSkill;
exports.getBuff = getBuff;
exports.getAllWinner = getAllWinner;