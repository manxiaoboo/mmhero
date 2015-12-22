/**
 * Created by MM on 2015/11/16 0016.
 */
var g_GameZOder = {bg:0,ui:1,front_panel:100,front_view:101,special_view:200};
var g_GameStatus = {normal:0,move:1,attach:2,medicine:3,rest:4,win:5,lose:6,die:7};
var _sioClient;
var SocketIO = SocketIO || io;
var group = {};
var currentUser = {};
var fightInfo = [];
var FightScene = cc.Scene.extend({
    gameLayer : null,//游戏层
    persons : {},
    currentStatus : {value:0},
    currentBlood : null,
    currentMagic : null,
    moveBtn : null,
    attachBtn : null,
    medicineBtn : null,
    restBtn : null,
    circle : null,
    attachCircle : null,
    countPerson:new Array(),
    currentPerson:{name:""},
    animationSprite:null,
    fightdata:null,
    inter:null,
    flag:null,
    finish:null,
    ctor : function(fightdata){
        this._super();
        this.fightdata = fightdata;
        this.schedule(this.update,3);
    },
    onEnter:function(){
        this._super();
        var _this = this;
        if(this.fightdata==null){
            return;
        }
        _sioClient.emit("getCurrentHero",sessionStorage.getItem("currentHero"));
        _sioClient.on('getCurrentHero', function(data){
            if(data.message=="success"){
                if(_this.fightdata==null){
                    return;
                }
                currentUser = data.hero;
                group = _this.fightdata.group;
                for(var o in group.group1){
                    if(group.group1[o].name=="me"){
                        currentUser.status = "person";
                        group.group1[o] = currentUser;
                    }
                }
                _this.initData(_this);
//                _this.schedule(_this.update,0.05);
            }else{
                alert("sorry,游戏出现问题.");
                window.location = "login.html";
            }
        });
        _sioClient.on('getRewardFinish',function(data){
            if(data.message=="success"){
                if(_this.fightdata==null){
                    return;
                }
                clearInterval(_this.inter);
                _this.gameLayer.removeAllChildren();
                _this.fightdata = null;
                cc.log("create a cultureScene");
                cc.director.runScene(new CultureScene());
//                cc.director.popScene();
            }else{
                alert("sorry,游戏出现问题.");
                window.location = "login.html";
            }
        });

    },
    onExit:function(){
        this.currentBlood = null;
        this.currentMagic = null;
        this.removeAllChildren();
        this.gameLayer.removeAllChildren();
    },
    initData: function(_this){
        _this.gameLayer = cc.Layer.create();
        _this.addChild(_this.gameLayer);
        //添加背景图片
        var bg = cc.Sprite.create(bg_fight1);
        bg.setAnchorPoint(cc.p(0,0));
        _this.gameLayer.addChild(bg,g_GameZOder.bg);
        _this.currentStatus.value = g_GameStatus.normal;
        //添加一个执行动画的精灵
        _this.animationSprite = new AnimationSprite();
        _this.gameLayer.addChild(_this.animationSprite,g_GameStatus.special_view);
        //初始化战斗信息
        _this.initFight(_this);
        _this.doCountPerson(_this);//将位置和序列存在数组中
        _this.start(_this);
    },
    update:function(dt){
        if(this.finish==true){
            if(this.flag==true){
                _sioClient.emit("getReward",{script:this.fightdata,user:currentUser});
            }else{
                this.gameLayer.removeAllChildren();
                this.fightdata = null;
//                cc.director.popScene();
                cc.director.runScene(new CultureScene());
            }
        }
    },
    start : function(_this){
        if(_this.fightdata==null){
            return;
        }
        var index = 0;
        var attachCircle = _this.attachCircle;
        var circle = _this.circle;
        var dieperson = [];
        doit(_this.persons,_this.countPerson,_this.currentPerson);

        function doit(persons,countPerson,currentPerson) {
            if(_this.fightdata==null){
                return;
            }
                var time = 0;
                var win1 = 0;
                var win2 = 0;


                //检测死掉的敌人
                for(var o in persons){
                    if(persons[o].currentBlood<=0){
                        cc.log(persons[o].name+"死掉了");
                        dieperson.push(persons[o].name);
                        persons[o].setVisible(false);
                        persons[o].isdie = true;
                        _this.gameLayer.removeChild(persons[o]);
                    }
                }

                for(var o in group.group1){
                    if(dieperson.indexOf(group.group1[o].name)>-1){
                        win1++;
                    }
                }
                for(var o in group.group2){
                    if(dieperson.indexOf(group.group2[o].name)>-1){
                        win2++;
                    }
                }
                if(win1==group.group1.length){
                    cc.log("you lose");
//                    cc.director.popScene();
                    clearInterval(_this.inter);
                    _this.flag =false;
                    _this.finish = true;
                    return;
                }
                if(win2==group.group2.length){
                    cc.log("you win");
                    clearInterval(_this.inter);
                    _this.flag = true;
                    _this.finish = true;
                    return;

                }

                if (index > countPerson.length-1) {
                    index = 0;
                }
                    while(dieperson.indexOf(countPerson[index])!=-1){
                        index++;
                        if (index > countPerson.length-1) {
                            index = 0;
                        }
                    }


                currentPerson.name = persons[countPerson[index]].name;

                _this.gameLayer.removeChild(_this.currentMagic);
                _this.gameLayer.removeChild(_this.currentBlood);
                _this.currentMagic = cc.LabelTTF.create("内力："+_this.persons[currentUser.name].currentMagic, "隶书", 14);
                _this.currentMagic.setColor({r:0, g:0, b:200});
                _this.currentMagic.setAnchorPoint(cc.p(0,0));
                _this.currentMagic.setPosition(600,510);
                _this.gameLayer.addChild(_this.currentMagic,g_GameZOder.front_view);
                _this.currentBlood = cc.LabelTTF.create("血量："+_this.persons[currentUser.name].currentBlood, "隶书", 14);
                _this.currentBlood.setColor({r:200, g:0, b:0});
                _this.currentBlood.setAnchorPoint(cc.p(0,0));
                _this.currentBlood.setPosition(600,530);
                _this.gameLayer.addChild(_this.currentBlood,g_GameZOder.front_view);

                if (persons[countPerson[index]].name == currentUser.name && persons[countPerson[index]].status == "person") {
                    cc.log("轮到我行动");
                    persons[countPerson[index]].hasrest = false;
                    persons[countPerson[index]].hasmoved = false;
                    persons[countPerson[index]].hasattach = false;

                     _this.inter = setInterval(function () {
                        if(time>=20*30){
                            clearInterval(_this.inter);
                            cc.log("行动超时");
                            persons[countPerson[index]].hasrest = true;
                            persons[countPerson[index]].hasmoved = true;
                            persons[countPerson[index]].hasattach = true;
                            attachCircle.setVisible(false);
                            circle.setVisible(false);
                            index++;
                            doit(persons,countPerson,currentPerson);
                        }
                        if (persons[countPerson[index]].hasrest) {
                            clearInterval(_this.inter);
                            persons[countPerson[index]].hasrest = true;
                            persons[countPerson[index]].hasmoved = true;
                            persons[countPerson[index]].hasattach = true;
                            attachCircle.setVisible(false);
                            circle.setVisible(false);
                            index++;
                            cc.log("我行动完毕");
                            doit(persons,countPerson,currentPerson);
                        }
                        if(persons[countPerson[index]].hasattach){
                            attachCircle.setVisible(false);
                            circle.setVisible(false);
                        }
                        time++;
                    }, 50);

                } else if (persons[countPerson[index]].name != currentUser.name && persons[countPerson[index]].status == "person") {
                    cc.log("轮到其他玩家行动");
                    cc.log("其他玩家行动完毕");
                    index++;
                    doit(persons,countPerson,currentPerson);
                } else {
                    cc.log("轮到电脑行动");
                    persons[countPerson[index]].hasrest = false;
                    persons[countPerson[index]].hasmoved = false;
                    persons[countPerson[index]].hasattach = false;

                    persons[countPerson[index]].autoAction(persons,group);

                     _this.inter = setInterval(function () {
                        if (persons[countPerson[index]].hasrest) {
                            clearInterval(_this.inter);
                            index++;
                            cc.log("电脑行动完毕");
                            doit(persons,countPerson,currentPerson);
                        }
                    }, 50);
                }
            }

    },

    doCountPerson:function(_this){
        for(var o in _this.persons){
            _this.countPerson.push(_this.persons[o].name);
        }
    },
    initFight:function(_this){
        //添加战斗角色
        _this.addPerson(_this);
        _this.createArea(_this);
        _this.addFightHandle(_this);
//        cc.audioEngine.playMusic(music_fight,true);
    },
    createArea : function(_this){
        _this.circle = new CircleSprite(_this.persons[currentUser.name],_this.currentStatus,_this.currentPerson,_this.persons);
        _this.gameLayer.addChild(_this.circle,g_GameZOder.bg);

        _this.attachCircle = new AttachCircle(_this.persons[currentUser.name],_this.currentStatus,_this.currentPerson,_this.persons);
        _this.gameLayer.addChild(_this.attachCircle,g_GameZOder.bg);

    },

    addPerson:function(_this){
        var group1x = 100;
        var group1y = 50;
        var group1index = 1;
        var group2x = 50;
        var group2y = 400;
        var group2index = 1;
            for(var j = 0;j<group.group1.length;j++){
                group.group1[j].isdie = false;
                _this.persons[group.group1[j].name] = new HeroSprite(group.group1[j],"up",{x:group1x+(group1index*100),y:group1y},_this.currentPerson,_this.persons,group,_this.animationSprite,fightInfo,_this.gameLayer);
                _this.persons[group.group1[j].name].setAnchorPoint(cc.p(0.5,0.2));
                _this.gameLayer.addChild(_this.persons[group.group1[j].name],g_GameZOder.ui);
                    group1index++;
            }
            for(var v = 0;v<group.group2.length;v++){
                group.group2[v].isdie = false;
                _this.persons[group.group2[v].name] = new HeroSprite(group.group2[v],"down",{x:800-group2x-(group2index*100),y:group2y},_this.currentPerson,_this.persons,group,_this.animationSprite,fightInfo,_this.gameLayer);
                _this.persons[group.group2[v].name].setAnchorPoint(cc.p(0.5,0.2));
                _this.gameLayer.addChild(_this.persons[group.group2[v].name],g_GameZOder.ui);
                    group2index++;
            }
    },
    addFightHandle:function(_this){
        var handle = cc.Sprite.create(ui_fight_handle);
        handle.setAnchorPoint(cc.p(0,0));
        handle.setPosition(490,460);
        var face = cc.Sprite.create("res/"+_this.persons[currentUser.name].img.fight+"-face.bmp");
        face.setAnchorPoint(cc.p(0,0));
        face.setPosition(520,490);
        _this.gameLayer.addChild(handle,g_GameZOder.front_panel);
        _this.gameLayer.addChild(face,g_GameZOder.front_view);
        var name = cc.LabelTTF.create(_this.persons[currentUser.name].name,"隶书",24);
        name.setColor({r:25, g:25, b:25});
        name.setAnchorPoint(cc.p(0,0));
        name.setPosition(600,550);
        _this.gameLayer.addChild(name,g_GameZOder.front_view);
        var gongfu = cc.LabelTTF.create(_this.persons[currentUser.name].gongfu.name,"隶书",20);
        gongfu.setColor({r:25, g:25, b:25});
        gongfu.setAnchorPoint(cc.p(0,0));
        gongfu.setPosition(680,549);
        _this.gameLayer.addChild(gongfu,g_GameZOder.front_view);
        var totalBlood = cc.LabelTTF.create("/"+_this.persons[currentUser.name].totalBlood, "隶书", 14);
        totalBlood.setColor({r:200, g:0, b:0});
        totalBlood.setAnchorPoint(cc.p(0,0));
        totalBlood.setPosition(670,530);
        _this.gameLayer.addChild(totalBlood,g_GameZOder.front_view);
        _this.currentBlood = cc.LabelTTF.create("血量："+_this.persons[currentUser.name].currentBlood, "隶书", 14);
        _this.currentBlood.setColor({r:200, g:0, b:0});
        _this.currentBlood.setAnchorPoint(cc.p(0,0));
        _this.currentBlood.setPosition(600,530);
        _this.gameLayer.addChild(_this.currentBlood,g_GameZOder.front_view);
        var totalMagic = cc.LabelTTF.create("/"+_this.persons[currentUser.name].totalMagic, "隶书", 14);
        totalMagic.setColor({r:0, g:0, b:200});
        totalMagic.setAnchorPoint(cc.p(0,0));
        totalMagic.setPosition(670,510);
        _this.gameLayer.addChild(totalMagic,g_GameZOder.front_view);
        _this.currentMagic = cc.LabelTTF.create("内力："+_this.persons[currentUser.name].currentMagic, "隶书", 14);
        _this.currentMagic.setColor({r:0, g:0, b:200});
        _this.currentMagic.setAnchorPoint(cc.p(0,0));
        _this.currentMagic.setPosition(600,510);
        _this.gameLayer.addChild(_this.currentMagic,g_GameZOder.front_view);
        _this.moveBtn = new moveBtn(_this.currentStatus,_this.persons[currentUser.name],_this.gameLayer,_this.circle);
        _this.gameLayer.addChild(_this.moveBtn,g_GameZOder.front_view);
        _this.attachBtn = new attachBtn(_this.currentStatus,_this.persons[currentUser.name],_this.gameLayer,_this.attachCircle);
        _this.gameLayer.addChild(_this.attachBtn,g_GameZOder.front_view);
        _this.medicineBtn = new medicineBtn(_this.currentStatus,_this.persons[currentUser.name],_this.gameLayer);
        _this.gameLayer.addChild(_this.medicineBtn,g_GameZOder.front_view);
        _this.restBtn = new restBtn(_this.currentStatus,_this.persons[currentUser.name],_this.gameLayer);
        _this.gameLayer.addChild(_this.restBtn,g_GameZOder.front_view);
    }
});
