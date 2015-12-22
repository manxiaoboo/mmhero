/**
 * Created by MM on 2015/11/22 0022.
 */
var g_GameZOder = {bg:0,ui:1,front_panel:100,front_view:101};
var _sioClient;
var SocketIO = SocketIO || io;
var loginScene = cc.Scene.extend({
    gameLayer:null,
    img:null,
    onEnter:function(){
        this._super();
        _sioClient = SocketIO.connect("http://mmhero.picp.net:3000", {"force new connection" : false});
        _sioClient.emit("refreshSocket",sessionStorage.getItem("currentHero"));
        this.initData();
//        this.schedule(this.update,0.05);
    },
    onExit:function(){
        this._super();
        this.gameLayer=null;
    },
        initData: function(){
        if(sessionStorage.getItem("currentHero")==null){
            window.location = "login.html";
        }
            this.gameLayer = cc.Layer.create();
        this.addChild(this.gameLayer);
        //添加背景图片
        var bg = cc.Sprite.create(bg_login);
        bg.setAnchorPoint(cc.p(0,0));
        this.gameLayer.addChild(bg,g_GameZOder.bg);
        if(sessionStorage.getItem("hasHero")=="false"){
            this.PaintCreate();
        }else{
            this.PaintSelect();
        }

        //var scene = new FightScene();
       // cc.Director.getInstance().replaceScene(cc.TransitionFade.create(2,scene));
        //cc.director.runScene(new FightScene());



    },
    update : function(){

    },
    PaintCreate : function(){
        var createHero = new CreateHeroButton();
        this.gameLayer.addChild(createHero,g_GameZOder.ui);
        var CreateLabel = new cc.LabelTTF("这位兄台，看你骨骼精奇，有没有兴趣行走江湖啊？", "Arial", 28);
        CreateLabel.setColor(cc.color(0,0,0,0));
        CreateLabel.setAnchorPoint(cc.p(0,0));
        CreateLabel.setPosition(168,250);
        this.gameLayer.addChild(CreateLabel,g_GameZOder.ui);
    },
    PaintSelect : function(){
        var SelectLabel = new cc.LabelTTF("请选择游玩角色：", "Arial", 32);
        SelectLabel.setColor(cc.color(0,0,0,0));
        SelectLabel.setAnchorPoint(cc.p(0,0));
        SelectLabel.setPosition(168,450);
        this.gameLayer.addChild(SelectLabel,g_GameZOder.ui);
         this.img = null;
        var _gameLayer = this.gameLayer;
        var _this = this;
        _sioClient.emit("getCurrentHero",sessionStorage.getItem("currentHero"));
        _sioClient.on('getCurrentHero', function(data){
           if(data.message=="success"){
               _this.img = new HeroImage(data.hero,_this);
               _gameLayer.addChild(_this.img,g_GameZOder.ui);
           }else{
               alert("sorry,游戏出现问题.");
               window.location = "login.html";
           }
        });
    },
    goNextScene:function(){
        if(this.gameLayer==null){
            return;
        }
        this.gameLayer.removeChild(this.img);
        cc.director.runScene(new CultureScene());
    }
});