/**
 * Created by MM on 2015/11/26 0026.
 */
/**
 * Created by MM on 2015/11/22 0022.
 */
var g_GameZOder = {bg:0,ui:1,front_panel:100,front_view:101};
var _sioClient;
var SocketIO = SocketIO || io;
var CreateHeroScene = cc.Scene.extend({
    gameLayer : null,
    question:null,
    allPerson:null,
    currentPersons:null,
    allPersonCompare:null,
    options:null,
    index:0,
    answer1:null,
    answer2:null,
    answer3:null,
    answer4:null,
    answer5:null,
    onEnter:function(){
        this._super();
        this.initData();
    },
    initData: function(){
        var _this = this;
        if(sessionStorage.getItem("currentHero")==null){
            window.location = "login.html";
        }
        this.gameLayer = cc.Layer.create();
        this.addChild(this.gameLayer);
        //添加背景图片
        var bg = cc.Sprite.create(bg_createHero);
        bg.setAnchorPoint(cc.p(0,0));
        this.gameLayer.addChild(bg,g_GameZOder.bg);
//        _sioClient = SocketIO.connect("http://192.168.1.104:3000/", {"force new connection" : false});
        _sioClient.emit("refreshSocket",sessionStorage.getItem("currentHero"));
        _sioClient.tag = "createHero";
        _sioClient.emit("getCreatePeronData",sessionStorage.getItem("currentHero"));
        _sioClient.on('canCreatePerson', function(data){
            if(data.allPerson.length<=0){
                window.location = "login.html";
            }else{
                _this.question = data.question;
                _this.allPerson = data.allPerson;
                _this.currentPersons = {name:null};
                _this.allPersonCompare = data.allPersonCompare;
                _this.paintQuestion1(_this);
            }
        });
        _sioClient.on('heroCreateFinish', function(data){
            if(data.message=="error"){
                window.location = "login.html";
            }else{
              cc.log("创建成功，哦耶！");
              cc.director.runScene(new CultureScene());
            }
        });

    },
    paintQuestion1:function(_this){
        var questionLabel1 = new cc.LabelTTF(_this.question[_this.index].question,"宋体", 28);
        questionLabel1.setColor(cc.color(0,0,0,0));
        questionLabel1.setAnchorPoint(cc.p(0,0));
        questionLabel1.setPosition(20,400);
        _this.gameLayer.addChild(questionLabel1,g_GameZOder.ui);
        _this.answer1 = new Answer(_this.question[_this.index].answer[0],{x:20,y:320},1,_this.gameLayer,_this.allPerson,_this.currentPersons,questionLabel1,_this);
        _this.answer2 = new Answer(_this.question[_this.index].answer[1],{x:20,y:260},2,_this.gameLayer,_this.allPerson,_this.currentPersons,questionLabel1,_this);
    },
    nextQuestion : function(){
        this.answer1.answer.setVisible(false);
        this.answer1.setVisible(false);
        this.answer1.setPosition(-1000,-1000);
        this.answer2.answer.setVisible(false);
        this.answer2.setPosition(-1000,-1000);
        this.answer2.setVisible(false);
        if(this.index<1){this.index++;}
        var questionLabel2 = new cc.LabelTTF(this.question[this.index].question,"宋体", 28);
        questionLabel2.setColor(cc.color(0,0,0,0));
        questionLabel2.setAnchorPoint(cc.p(0,0));
        questionLabel2.setPosition(20,400);
        this.gameLayer.addChild(questionLabel2,g_GameZOder.ui);
        this.answer3 = new Answer(this.question[this.index].answer[0],{x:20,y:320},3,this.gameLayer,this.allPerson,this.currentPersons,questionLabel2,this);
        this.answer4 = new Answer(this.question[this.index].answer[1],{x:20,y:260},4,this.gameLayer,this.allPerson,this.currentPersons,questionLabel2,this);
        this.answer5 = new Answer(this.question[this.index].answer[2],{x:20,y:200},5,this.gameLayer,this.allPerson,this.currentPersons,questionLabel2,this);
    },
    chooseHero : function(){
        cc.log(this.currentPersons.name);
        this.answer3.answer.setVisible(false);
        this.answer3.setVisible(false);
        this.answer3.setPosition(-1000,-1000);
        this.answer4.answer.setVisible(false);
        this.answer4.setVisible(false);
        this.answer4.setPosition(-1000,-1000);
        this.answer5.answer.setVisible(false);
        this.answer5.setVisible(false);
        this.answer5.setPosition(-1000,-1000);
        var label = new cc.LabelTTF("少侠擦亮眼睛看好了，\n下面哪个才是你呢？","宋体", 28);
        label.setColor(cc.color(0,0,0,0));
        label.setAnchorPoint(cc.p(0,0));
        label.setPosition(20,400);
        this.gameLayer.addChild(label,g_GameZOder.ui);
        for(var o = 0; o< this.currentPersons.name.length;o++){
            if(o<3){
                new ChooseHero(this.currentPersons.name[o],this.allPersonCompare,{x:50+o*120,y:300},this.gameLayer,this);
            }else{
                new ChooseHero(this.currentPersons.name[o],this.allPersonCompare,{x:50+(o-3)*120,y:150},this.gameLayer,this);
            }
        }

        //TODO  数据库中添加这些角色的基本数据， 附加在用户账号上，做一个返回重新选择的按钮，后面可以做养成界面了。

    },
    sendBaseHero:function(heroname){
        _sioClient.emit("createPersonChoose",{name:sessionStorage.getItem("currentHero"),hero:heroname});
    }
});