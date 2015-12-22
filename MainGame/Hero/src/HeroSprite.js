/**
 * Created by MM on 2015/11/16 0016.
 */
var HeroSprite = cc.Sprite.extend({
    name:null,//名字
    totalBlood:null,//总血量
    totalMagic:null,//总内力
    speed:null,//轻功
    gongfu:null,//武学名称
    yinggong:null,//硬功
    ruangong:null,//软功
    yanli:null, //眼力
    erli:null,//耳力
    zhili:null,//指力
    neigong:null,//内功
    dugong:null,//毒功
    wuxuezhishi:null,//武学知识
    jianghujingyan:null,//江湖经验
    wuxing:null,//悟性
    qinheli:null,//亲和力
    yixue:null,//医学
    chadao:null,//茶道
    shufa:null,//书法
    huihua:null,//绘画
    qidao:null,//棋道
    yinlv:null,//音律
    xingyunzhi:null,//幸运值
    daofa:null,//刀法
    jianfa:null,//剑法
    gunfa:null,//棍法
    zhifa:null,//指法
    tuifa:null,//腿法
    quanfa:null,//拳法
    zhangfa:null,//掌法
    anqi:null,//暗器
    currentDirection:null,//当前人物朝向
    currentPosition:null,//当前位置
    currentBlood:null,//当前血量
    currentMagic:null,//当前内力
    hasmoved:null,//是否移动过
    hasrest:null,//是否休息
    img:null,//图片资源
    status:null,//身份
    bingren:null,//兵刃
    isdie:null,
    action:null,//动画对象

    currentPerson:null,
    persons:null,
    group:null,
    hero : null,
    animationSprite:null,
    target:null,
    fightInfo:null,
    gameLayer:null,
    ctor:function(hero,direction,position,currentPerson,persons,group,animationSprite,fightInfo,gameLayer){
        this._super();
        this.initWithFile("res/"+hero.img.fight+"-1.png");
        this.initHero(hero,direction,position);
        this.currentPerson = currentPerson;
        this.persons = persons;
        this.group = group;
        this.animationSprite = animationSprite;
        this.fightInfo = fightInfo;
        this.gameLayer = gameLayer;
        this.mouseListener();
    },
    initHero:function(hero,direction,position){
        this.name = hero.name;
        this.totalBlood = hero.totalBlood;
        this.totalMagic = hero.totalMagic;
        this.speed = hero.speed;
        this.gongfu = hero.gongfu;
        this.yinggong = hero.yinggong;
        this.ruangong = hero.ruangong;
        this.yanli = hero.yanli;
        this.erli = hero.erli;
        this.zhili = hero.zhili;
        this.neigong = hero.neigong;
        this.dugong = hero.dugong;
        this.wuxuezhishi = hero.wuxuezhishi;
        this.jianghujingyan = hero.jianghujingyan;
        this.wuxing = hero.wuxing;
        this.qinheli = hero.qinheli;
        this.yixue = hero.yixue;
        this.chadao = hero.chadao;
        this.shufa = hero.shufa;
        this.huihua = hero.huihua;
        this.qidao = hero.qidao;
        this.yinlv = hero.yinlv;
        this.xingyunzhi = hero.xingyunzhi;
        this.daofa = hero.daofa;
        this.jianfa = hero.jianfa;
        this.gunfa = hero.gunfa;
        this.zhifa = hero.zhifa;
        this.tuifa = hero.tuifa;
        this.quanfa = hero.quanfa;
        this.zhangfa = hero.zhangfa;
        this.currentDirection = direction;
        this.currentPosition = position;
        this.currentBlood = hero.totalBlood;
        this.currentMagic = hero.totalMagic;
        this.anqi = hero.anqi;
        this.img = hero.img;
        this.status = hero.status;
        this.bingren = hero.bingren;
        this.isdie = hero.isdie;
        this.hasrest = hero.hasrest;
        this.setPosition(this.currentPosition.x,this.currentPosition.y);
        this.hero = hero;
    },
    update : function(dt){
    },
    changePosition : function(currentPosition){
        this.currentPosition = currentPosition;
        this.runAction(cc.MoveTo.create(0.5,cc.p(this.currentPosition.x,this.currentPosition.y)));
    },
    attach : function(){
            if(this.action != null&&!this.action.isDone()){
                return;
            }
            var animation = cc.Animation.create();
            for (var o = 1;o <= this.img.count;o++) {
                animation.addSpriteFrameWithFile("res/"+this.img.fight+"-"+o+".png");
            }
            animation.setDelayPerUnit(0.08);
            animation.setRestoreOriginalFrame(true);
            this.action = cc.Animate.create(animation);
            this.runAction(cc.Sequence.create(this.action));
            this.persons[this.currentPerson.name].hasattach = true;

    },
    autoAction : function(persons,group){
        var mygroup = 'group2';
        for(var o in group.group1){
            if(group.group1[o].name==this.name){
                mygroup = 'group1';
                break;
            }
        }
        var Target = null;
        if(mygroup=='group2'){
            for(var o in group.group1){

                if(Target==null){
                    if(persons[group.group1[o].name].isdie)continue;
                    Target = persons[group.group1[o].name];
                }
                 if(Target.isdie){
                     Target=null;continue;
                 }
                   var nowdiff = Math.pow((Math.abs((this.currentPosition.x - Target.currentPosition.x))*Math.abs((this.currentPosition.x - Target.currentPosition.x)) + Math.abs((this.currentPosition.y - Target.currentPosition.y)) * Math.abs((this.currentPosition.y - Target.currentPosition.y))), 0.5);
                   var newdiff = Math.pow((Math.abs((this.currentPosition.x - persons[group.group1[o].name].currentPosition.x))*Math.abs((this.currentPosition.x - persons[group.group1[o].name].currentPosition.x)) + Math.abs((this.currentPosition.y - persons[group.group1[o].name].currentPosition.y)) * Math.abs((this.currentPosition.y - persons[group.group1[o].name].currentPosition.y))), 0.5);
                   if((newdiff<nowdiff)&&!persons[group.group1[o].name].isdie){
                       Target = persons[group.group1[o].name];
                   }

            }
        }else{
            for(var o in group.group2){
                if(Target==null){
                    if(persons[group.group2[o].name].isdie)continue;
                    Target = persons[group.group2[o].name];
                }
                if(Target.isdie){
                    Target=null;continue;
                }
                    var nowdiff = Math.pow((Math.abs((this.currentPosition.x - Target.currentPosition.x))*Math.abs((this.currentPosition.x - Target.currentPosition.x)) + Math.abs((this.currentPosition.y - Target.currentPosition.y)) * Math.abs((this.currentPosition.y - Target.currentPosition.y))), 0.5);
                    var newdiff = Math.pow((Math.abs((this.currentPosition.x - persons[group.group2[o].name].currentPosition.x))*Math.abs((this.currentPosition.x - persons[group.group2[o].name].currentPosition.x)) + Math.abs((this.currentPosition.y - persons[group.group2[o].name].currentPosition.y)) * Math.abs((this.currentPosition.y - persons[group.group2[o].name].currentPosition.y))), 0.5);
                    if((newdiff<nowdiff)&&!persons[group.group2[o].name].isdie){
                        Target = persons[group.group2[o].name];
                    }

            }
        }
        target = Target;
        //判断当前是否在攻击范围内
        var compareArea = Math.pow((Math.abs((this.currentPosition.x - Target.currentPosition.x))*Math.abs((this.currentPosition.x - Target.currentPosition.x)) + Math.abs((this.currentPosition.y - Target.currentPosition.y)) * Math.abs((this.currentPosition.y - Target.currentPosition.y))), 0.5);
        if(Math.abs(compareArea)>this.gongfu.radius.len){
            this.autoCountPosition(Target);
            this.changePosition(this.currentPosition);
            this.scheduleOnce(this.autoMoveTimeOut, 1.5);
            var compareArea = Math.pow((Math.abs((this.currentPosition.x - Target.currentPosition.x))*Math.abs((this.currentPosition.x - Target.currentPosition.x)) + Math.abs((this.currentPosition.y - Target.currentPosition.y)) * Math.abs((this.currentPosition.y - Target.currentPosition.y))), 0.5);
            if(Math.abs(compareArea)<=this.gongfu.radius.len){
                this.hasmoved = true;
                this.scheduleOnce(this.autoAttachTimeOut, 1);
                this.scheduleOnce(this.autoWaitTimeOut, 5);

                switch(this.bingren){
                    case 'daofa': target.currentBlood -= this.daofa*0.5+50;this.pushFightInfo(this.name,target,this.daofa,"刀法");break;
                    case 'jianfa':target.currentBlood -= this.jianfa*0.5+50;this.pushFightInfo(this.name,target,this.jianfa,"剑法");break;
                    case 'quanfa':target.currentBlood -= this.quanfa*0.5+50;this.pushFightInfo(this.name,target,this.quanfa,"拳法");break;
                    case 'anqi':target.currentBlood -= this.anqi*0.5+50;this.pushFightInfo(this.name,target,this.anqi,"暗器");break;
                    case 'zhangfa':target.currentBlood -= this.zhangfa*0.5+50;this.pushFightInfo(this.name,target,this.zhangfa,"掌法");break;
                    case 'gunfa':target.currentBlood -= this.gunfa*0.5+50;this.pushFightInfo(this.name,target,this.gunfa,"棍法");break;
                    case 'tuifa':target.currentBlood -= this.tuifa*0.5+50;this.pushFightInfo(this.name,target,this.tuifa,"腿法");break;
                    case 'zhifa':target.currentBlood -= this.zhifa*0.5+50;this.pushFightInfo(this.name,target,this.zhifa,"指法");break;
                    default:cc.log("没写，是不是忘了？"+this.bingren);break
                }
            }
        }else{
            this.hasmoved = true;
            this.scheduleOnce(this.autoAttachTimeOut, 1);
            this.scheduleOnce(this.autoWaitTimeOut,7);
            switch(this.bingren){
                case 'daofa': target.currentBlood -= this.daofa*0.5+50;this.pushFightInfo(this.name,target,this.daofa,"刀法");break;
                case 'jianfa':target.currentBlood -= this.jianfa*0.5+50;this.pushFightInfo(this.name,target,this.jianfa,"剑法");break;
                case 'quanfa':target.currentBlood -= this.quanfa*0.5+50;this.pushFightInfo(this.name,target,this.quanfa,"拳法");break;
                case 'anqi':target.currentBlood -= this.anqi*0.5+50;this.pushFightInfo(this.name,target,this.anqi,"暗器");break;
                case 'zhangfa':target.currentBlood -= this.zhangfa*0.5+50;this.pushFightInfo(this.name,target,this.zhangfa,"掌法");break;
                case 'gunfa':target.currentBlood -= this.gunfa*0.5+50;this.pushFightInfo(this.name,target,this.gunfa,"棍法");break;
                case 'tuifa':target.currentBlood -= this.tuifa*0.5+50;this.pushFightInfo(this.name,target,this.tuifa,"腿法");break;
                case 'zhifa':target.currentBlood -= this.zhifa*0.5+50;this.pushFightInfo(this.name,target,this.zhifa,"指法");break;
                default:cc.log("没写，是不是忘了？"+this.bingren);break
            }
        }
        //绑定当前角色的 主修功法 加成    扣血！


    },
    /**
     * 添加战斗信息
     */
    pushFightInfo:function(myname,target,attr,info){
        var x = 50;
        var y = 540;
        var status = "";
        if(this.fightInfo.length>=10){
            for(var o in this.fightInfo){
                this.gameLayer.removeChild(this.fightInfo[o]);
            }
            this.fightInfo.length=0;
        }else if(this.fightInfo.length>0&&this.fightInfo.length<10){
            y=this.fightInfo[this.fightInfo.length-1].getPosition().y-15;
        }
        if(target.currentBlood>=target.totalBlood*0.8){
            status = target.name+"仿佛浑若无事...";
        }else if(target.currentBlood>=target.totalBlood*0.6&&target.currentBlood<target.totalBlood*0.8){
            status = target.name+"有些呼吸急促了...";
        }else if(target.currentBlood>=target.totalBlood*0.3&&target.currentBlood<target.totalBlood*0.6){
            status = target.name+"已经节节败退...";
        }else if(target.currentBlood>0&&target.currentBlood<target.totalBlood*0.3){
            status = target.name+"气若游丝...";
        }else{
            status = target.name+"败阵！";
        }
        var label = new cc.LabelTTF(myname+"对"+target.name+"造成了"+(attr*0.5+50)+"点"+info+"伤害！"+status, "Arial",14);
        label.setColor(cc.color(255,255,0,0));
        label.setAnchorPoint(cc.p(0,0));
        label.setPosition(x,y);
        this.fightInfo.push(label);
        this.gameLayer.addChild(label,300);


    },
    /**
     * 计算两点之间连线角度
     * @param start
     * @param end
     * @returns {number}
     */
    angle : function(start,end){
        var diff_x = end.x - start.x;
        var diff_y = end.y - start.y;
        return Math.abs(360*Math.atan(diff_y/diff_x)/(2*Math.PI));
    },
    /**
     * 电脑自动移动
     * @param Target
     */
    autoCountPosition : function(Target){
        var angle = parseInt(this.angle(this.currentPosition,Target.currentPosition));
        if(angle==0){//当前角色 与 目标敌人  垂直相等  在正左方或正右方
            if(this.currentPosition.x>Target.currentPosition.x){
                if(this.currentPosition.x-Target.currentPosition.x>this.gongfu.radius.len){
                    this.currentPosition.x = this.currentPosition.x-this.speed;
                }
            }else if(this.currentPosition.x<Target.currentPosition.x){
                if(Target.currentPosition.x-this.currentPosition.x>this.gongfu.radius.len){
                    this.currentPosition.x = this.currentPosition.x+this.speed;
                }
            }
        }else if(angle==90){//当前角色 与 目标敌人  水平相等  在正上方或正下方
            if(this.currentPosition.y>Target.currentPosition.y){
                if(this.currentPosition.y-Target.currentPosition.y>this.gongfu.radius.len){
                    this.currentPosition.y = this.currentPosition.y-this.speed;
                }
            }else if(this.currentPosition.y<Target.currentPosition.y){
                if(Target.currentPosition.y-this.currentPosition.y>this.gongfu.radius.len){
                    this.currentPosition.y = this.currentPosition.y+this.speed;
                }
            }
        }else{
            if(this.currentPosition.x>Target.currentPosition.x && this.currentPosition.y<Target.currentPosition.y){//敌人位于当前角色左上方
                this.currentPosition.x = this.currentPosition.x - (90-angle)/90*this.speed;
                this.currentPosition.y = this.currentPosition.y + angle/90*this.speed;
            }else if(this.currentPosition.x<Target.currentPosition.x && this.currentPosition.y<Target.currentPosition.y){//敌人位于当前角色右上方
                this.currentPosition.x = this.currentPosition.x + (90-angle)/90*this.speed;
                this.currentPosition.y = this.currentPosition.y + angle/90*this.speed;
            }else if(this.currentPosition.x>Target.currentPosition.x && this.currentPosition.y>Target.currentPosition.y){//敌人位于当前角色左下方
                this.currentPosition.x = this.currentPosition.x - angle/90*this.speed;
                this.currentPosition.y = this.currentPosition.y - (90-angle)/90*this.speed;
            }else{//敌人位于当前角色右下方
                this.currentPosition.x = this.currentPosition.x + angle/90*this.speed;
                this.currentPosition.y = this.currentPosition.y - (90-angle)/90*this.speed;
            }
        }
    },
    mouseListener : function(){
        var _this = this;
        cc.eventManager.addListener(cc.EventListener.create({
        event : cc.EventListener.MOUSE,
        onMouseDown : function(event) {
            var pos = event.getLocation(); //当前事件发生的光标位置
            var target = event.getCurrentTarget(); //事件绑定的目标
            if( cc.rectContainsPoint(target.getBoundingBox(), pos) ) {
                var currentPerson = _this.persons[_this.currentPerson.name];
                if(currentPerson.hasattach)return false;
                var mygroup = 'group2';
                for(var o in group.group1){
                    if(group.group1[o].name==_this.name){
                        mygroup = 'group1';
                        break;
                    }
                }
                var currentPersonGroup = 'group2';
                for(var o in group.group1){
                    if(group.group1[o].name==_this.persons[_this.currentPerson.name].name){
                        currentPersonGroup = 'group1';
                        break;
                    }
                }
                if(currentPersonGroup==mygroup)return false;
                var compareArea = Math.pow((Math.abs((_this.currentPosition.x - currentPerson.currentPosition.x))*Math.abs((_this.currentPosition.x - currentPerson.currentPosition.x)) + Math.abs((_this.currentPosition.y - currentPerson.currentPosition.y)) * Math.abs((_this.currentPosition.y - currentPerson.currentPosition.y))), 0.5);
                if(currentPerson.gongfu.radius.len<compareArea)return false;
                _this.persons[_this.currentPerson.name].attach();

                //绑定当前角色的 主修功法 加成    扣血！
                switch( _this.persons[_this.currentPerson.name].bingren){
                    case 'daofa': _this.currentBlood -=  _this.persons[_this.currentPerson.name].daofa*0.5+50;
                        _this.pushFightInfo( _this.persons[_this.currentPerson.name].name,_this, _this.persons[_this.currentPerson.name].daofa,"刀法");
                        break;
                    case 'jianfa':_this.currentBlood -=  _this.persons[_this.currentPerson.name].jianfa*0.5+50;
                        _this.pushFightInfo( _this.persons[_this.currentPerson.name].name,_this, _this.persons[_this.currentPerson.name].jianfa,"剑法");
                        break;
                    case 'quanfa':_this.currentBlood -=  _this.persons[_this.currentPerson.name].quanfa*0.5+50;
                        _this.pushFightInfo( _this.persons[_this.currentPerson.name].name,_this, _this.persons[_this.currentPerson.name].quanfa,"拳法");
                        break;
                    case 'anqi':_this.currentBlood -=  _this.persons[_this.currentPerson.name].anqi*0.5+50;
                        _this.pushFightInfo( _this.persons[_this.currentPerson.name].name,_this, _this.persons[_this.currentPerson.name].anqi,"暗器");
                        break;
                    case 'zhangfa':_this.currentBlood -=  _this.persons[_this.currentPerson.name].zhangfa*0.5+50;
                        _this.pushFightInfo( _this.persons[_this.currentPerson.name].name,_this, _this.persons[_this.currentPerson.name].zhangfa,"掌法");
                        break;
                    case 'gunfa':_this.currentBlood -=  _this.persons[_this.currentPerson.name].gunfa*0.5+50;
                        _this.pushFightInfo( _this.persons[_this.currentPerson.name].name,_this, _this.persons[_this.currentPerson.name].gunfa,"棍法");
                        break;
                    case 'tuifa':_this.currentBlood -=  _this.persons[_this.currentPerson.name].tuifa*0.5+50;
                        _this.pushFightInfo( _this.persons[_this.currentPerson.name].name,_this, _this.persons[_this.currentPerson.name].tuifa,"腿法");
                        break;
                    case 'zhifa':_this.currentBlood -=  _this.persons[_this.currentPerson.name].zhifa*0.5+50;
                        _this.pushFightInfo( _this.persons[_this.currentPerson.name].name,_this, _this.persons[_this.currentPerson.name].zhifa,"指法");
                        break;
                    default:cc.log("没写，是不是忘了？");break
                }
                //播放对方攻击特效动画

//                _this.scheduleOnce(_this.attachTimeOut, 2.5);
                _this.persons[_this.currentPerson.name].hasattach = true;
                _this.animationSprite.doAction(_this,_this.persons[_this.currentPerson.name]);
                _this.runAction(cc.Blink.create(1,6));
                return true;
            }
            return false;
        }
    }), this);
    },
//    attachTimeOut : function()
//    {
//
//    },
    autoAttachTimeOut : function(){
        var animation = cc.Animation.create();
        for (var o = 1;o <= this.img.count;o++) {
            animation.addSpriteFrameWithFile("res/"+this.img.fight+"-"+o+".png");
        }
        animation.setDelayPerUnit(0.08);
        animation.setRestoreOriginalFrame(true);
        this.action = cc.Animate.create(animation);
        this.runAction(cc.Sequence.create(this.action));
        var action = this.action;
        var person = this;
        var inter = setInterval(function(){
            if(action.isDone()){
                clearInterval(inter);
            }
        },50);
        target.animationSprite.doAction(target,this.persons[this.currentPerson.name]);
        target.runAction(cc.Blink.create(1,6));
        this.scheduleOnce(this.autoAttachTimeOut, 1);
    },
    autoMoveTimeOut : function(){
        this.hasattach = true;
        this.hasrest = true;
        this.scheduleOnce(this.autoMoveTimeOut, 1.5);
    },
    autoWaitTimeOut:function(){
        this.hasattach = true;
        this.hasrest = true;
        this.scheduleOnce(this.autoWaitTimeOut, 7);
    }

});