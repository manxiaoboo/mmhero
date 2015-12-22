/**
 * Created by MM on 2015/11/30 0030.
 */
var g_GameZOder = {bg:0,ui:1,front_panel:100,front_view:101};
var _sioClient;
var SocketIO = SocketIO || io;
var CultureScene = cc.Scene.extend({
    gameLayer:{},
    functionLayer:{},
    talkLayer:{},
    attrLayer:{},
    me:{},
    mainFunction:{},
    dazaFunction:{},
    jibengongFunction:{},
    wugongFunction:{},
    jinengFunction:{},
    yishuFunction:{},
    chuangdangFunction:{},
    shezhiFunction:{},
    xiuxi:{},
    talkSection:null,
    currentStatus:{status:"normal"},
    talk:null,
    attr:null,
    bg:null,
    has:false,
    onEnter:function(){
        this._super();
        if(this.has)return;
//        cc.audioEngine.playMusic(music_culture1,true);
//        _sioClient = SocketIO.connect("http://192.168.1.104:3000/", {"force new connection" : false});//localhost:3000
        _sioClient.emit("refreshSocket",sessionStorage.getItem("currentHero"));
        this.initData();
//        this.schedule(this.update,0.05);
    },
    initData: function(){
        cc._canvas.style.cursor = "pointer";
        var _this = this;
        if(sessionStorage.getItem("currentHero")==null){
            window.location = "login.html";
        }
        this.gameLayer = cc.Layer.create();
        this.addChild(this.gameLayer);
        this.functionLayer = cc.Layer.create();
        this.functionLayer.setContentSize(840,130);
        this.functionLayer.setAnchorPoint(cc.p(0,0));
        this.functionLayer.setPosition(0,0);
        this.addChild(this.functionLayer,g_GameZOder.front_view);
        this.talkLayer = cc.Layer.create();
        this.talkLayer.setAnchorPoint(cc.p(0,0));
        this.talkLayer.setPosition(0,0);
        this.addChild(this.talkLayer,g_GameZOder.special_view);
        this.attrLayer = cc.Layer.create();
        this.attrLayer.setContentSize(500,150);
        this.attrLayer.setAnchorPoint(cc.p(0,1));
        this.attrLayer.setPosition(340,590);
        this.addChild(this.attrLayer,g_GameZOder.front_view);

        //添加背景图片
        this.bg = cc.Sprite.create(bg_home);
        this.bg.setAnchorPoint(cc.p(0,0));
        this.bg.setPosition(140,130);
        this.gameLayer.addChild(this.bg,g_GameZOder.bg);
        var framework = cc.Sprite.create(ui_framework);
        framework.setAnchorPoint(cc.p(0,0));
        this.gameLayer.addChild(framework,g_GameZOder.ui);
        _sioClient.emit("getCurrentHero",sessionStorage.getItem("currentHero"));
        _sioClient.on('getCurrentHero', function(data){
            if(data.message=="success"){
                if(_this.has)return;
                _this.me = data.hero;
                _this.paintHeadAndName(_this);
                _this.paintGongfu(_this);
                _this.paintDate(_this);
                _this.paintFunction(_this);
                _this.paintAttr(_this);
            }else{
                alert("sorry,游戏出现问题.");
                window.location = "login.html";
            }
        });
        _sioClient.on('fight', function(data){
           for(var o in data.script.talk){
               if(_this.has)return;
                if(data.script.talk[o].name=="me"){
                    data.script.talk[o].name = _this.me.name;
                    data.script.talk[o].img = _this.me.img.dir.replace('/',"");
                }
           }
            _this.talk =  data.script;
//                _this.functionLayer.removeAllChildren();
            _this.functionLayer.setVisible(false);
            _this.currentStatus.status = "talk";

            if(_this.talkSection==null){
                _this.talkSection = new TalkSprite(data.script,_this.currentStatus,_this.functionLayer,_this);
                _this.talkLayer.addChild(_this.talkSection);

            }else{
                _this.talkSection.setTalk(data.script);
            }

        });
        _this.initFunctionLayer(_this);
    },
    update : function(){

    },
    initFunctionLayer:function(_this){
        var daza = new FunctionButton("daza",{x:20,y:32},"daza",_this.mainFunction,_this.dazaFunction,_this.jibengongFunction,_this.chuangdangFunction,_this.currentStatus,_this.gameLayer,_this.bg);
        _this.functionLayer.addChild(daza,g_GameZOder.front_panel);
        _this.mainFunction.daza = daza;
        var jibengong = new FunctionButton("jibengong",{x:120,y:32},"jibengong",_this.mainFunction,_this.dazaFunction,_this.jibengongFunction,_this.chuangdangFunction,_this.currentStatus,_this.gameLayer,_this.bg);
        _this.functionLayer.addChild(jibengong,g_GameZOder.front_panel);
        _this.mainFunction.jibengong = jibengong;
        var wugong = new FunctionButton("wugong",{x:220,y:32},"wugong",_this.mainFunction,_this.dazaFunction,_this.jibengongFunction,_this.chuangdangFunction,_this.currentStatus,_this.gameLayer,_this.bg);
        _this.functionLayer.addChild(wugong,g_GameZOder.front_panel);
        _this.mainFunction.wugong = wugong;
        var jineng = new FunctionButton("jineng",{x:320,y:32},"jineng",_this.mainFunction,_this.dazaFunction,_this.jibengongFunction,_this.chuangdangFunction,_this.currentStatus,_this.gameLayer,_this.bg);
        _this.functionLayer.addChild(jineng,g_GameZOder.front_panel);
        _this.mainFunction.jineng = jineng;
        var yishu = new FunctionButton("yishu",{x:420,y:32},"yishu",_this.mainFunction,_this.dazaFunction,_this.jibengongFunction,_this.chuangdangFunction,_this.currentStatus,_this.gameLayer,_this.bg);
        _this.functionLayer.addChild(yishu,g_GameZOder.front_panel);
        _this.mainFunction.yishu = yishu;
        var chuangdang = new FunctionButton("chuangdang",{x:520,y:32},"chuangdang",_this.mainFunction,_this.dazaFunction,_this.jibengongFunction,_this.chuangdangFunction,_this.currentStatus,_this.gameLayer,_this.bg);
        _this.functionLayer.addChild(chuangdang,g_GameZOder.front_panel);
        _this.mainFunction.chuangdang = chuangdang;
        var shezhi = new FunctionButton("shezhi",{x:620,y:32},"shezhi",_this.mainFunction,_this.dazaFunction,_this.jibengongFunction,_this.chuangdangFunction,_this.currentStatus,_this.gameLayer,_this.bg);
        _this.functionLayer.addChild(shezhi,g_GameZOder.front_panel);
        _this.mainFunction.shezhi = shezhi;
        var xiuxi = new FunctionButton("xiuxi",{x:720,y:32},"xiuxi",_this.mainFunction,_this.dazaFunction,_this.jibengongFunction,_this.chuangdangFunction,_this.currentStatus,_this.gameLayer,_this.gameLayer,_this.bg);
        _this.functionLayer.addChild(xiuxi,g_GameZOder.front_panel);
        _this.mainFunction.xiuxi = xiuxi;
//        daza.setVisible(false);
//        daza.setPosition(daza.getPosition.x-1000,daza.getPosition.y-1000);
        var saodi = new FunctionButton("saodi",{x:20-1000,y:32-1000},"saodi",_this.mainFunction,_this.dazaFunction,_this.jibengongFunction,_this.chuangdangFunction,_this.currentStatus,_this.gameLayer,_this.bg);
        _this.functionLayer.addChild(saodi,g_GameZOder.front_panel);
        _this.dazaFunction.saodi = saodi;
        var tiaoshui = new FunctionButton("tiaoshui",{x:120-1000,y:32-1000},"tiaoshui",_this.mainFunction,_this.dazaFunction,_this.jibengongFunction,_this.chuangdangFunction,_this.currentStatus,_this.gameLayer,_this.bg);
        _this.functionLayer.addChild(tiaoshui,g_GameZOder.front_panel);
        _this.dazaFunction.tiaoshui = tiaoshui;
        var kanchai = new FunctionButton("kanchai",{x:220-1000,y:32-1000},"kanchai",_this.mainFunction,_this.dazaFunction,_this.jibengongFunction,_this.chuangdangFunction,_this.currentStatus,_this.gameLayer,_this.bg);
        _this.functionLayer.addChild(kanchai,g_GameZOder.front_panel);
        _this.dazaFunction.kanchai = kanchai;
        var xiyi = new FunctionButton("xiyi",{x:320-1000,y:32-1000},"xiyi",_this.mainFunction,_this.dazaFunction,_this.jibengongFunction,_this.chuangdangFunction,_this.currentStatus,_this.gameLayer,_this.bg);
        _this.functionLayer.addChild(xiyi,g_GameZOder.front_panel);
        _this.dazaFunction.xiyi = xiyi;
        var paocha = new FunctionButton("paocha",{x:420-1000,y:32-1000},"paocha",_this.mainFunction,_this.dazaFunction,_this.jibengongFunction,_this.chuangdangFunction,_this.currentStatus,_this.gameLayer,_this.bg);
        _this.functionLayer.addChild(paocha,g_GameZOder.front_panel);
        _this.dazaFunction.paocha = paocha;
        var xiachu = new FunctionButton("xiachu",{x:520-1000,y:32-1000},"xiachu",_this.mainFunction,_this.dazaFunction,_this.jibengongFunction,_this.chuangdangFunction,_this.currentStatus,_this.gameLayer,_this.bg);
        _this.functionLayer.addChild(xiachu,g_GameZOder.front_panel);
        _this.dazaFunction.xiachu = xiachu;
        var momo = new FunctionButton("momo",{x:620-1000,y:32-1000},"momo",_this.mainFunction,_this.dazaFunction,_this.jibengongFunction,_this.chuangdangFunction,_this.currentStatus,_this.gameLayer,_this.bg);
        _this.functionLayer.addChild(momo,g_GameZOder.front_panel);
        _this.dazaFunction.momo = momo;
        var fanhui = new FunctionButton("fanhui",{x:720-1000,y:32-1000},"fanhui",_this.mainFunction,_this.dazaFunction,_this.jibengongFunction,_this.chuangdangFunction,_this.currentStatus,_this.gameLayer,_this.bg);
        _this.functionLayer.addChild(fanhui,g_GameZOder.front_panel);
        _this.dazaFunction.fanhui = fanhui;


        var yangong = new FunctionButton("yangong",{x:20-1000,y:32-1000},"yangong",_this.mainFunction,_this.dazaFunction,_this.jibengongFunction,_this.chuangdangFunction,_this.currentStatus,_this.gameLayer,_this.bg);
        _this.functionLayer.addChild(yangong,g_GameZOder.front_panel);
        _this.jibengongFunction.yangong = yangong;
        var ergong = new FunctionButton("ergong",{x:120-1000,y:32-1000},"ergong",_this.mainFunction,_this.dazaFunction,_this.jibengongFunction,_this.chuangdangFunction,_this.currentStatus,_this.gameLayer,_this.bg);
        _this.functionLayer.addChild(ergong,g_GameZOder.front_panel);
        _this.jibengongFunction.ergong = ergong;
        var ruangong = new FunctionButton("ruangong",{x:220-1000,y:32-1000},"ruangong",_this.mainFunction,_this.dazaFunction,_this.jibengongFunction,_this.chuangdangFunction,_this.currentStatus,_this.gameLayer,_this.bg);
        _this.functionLayer.addChild(ruangong,g_GameZOder.front_panel);
        _this.jibengongFunction.ruangong = ruangong;
        var yinggong = new FunctionButton("yinggong",{x:320-1000,y:32-1000},"yinggong",_this.mainFunction,_this.dazaFunction,_this.jibengongFunction,_this.chuangdangFunction,_this.currentStatus,_this.gameLayer,_this.bg);
        _this.functionLayer.addChild(yinggong,g_GameZOder.front_panel);
        _this.jibengongFunction.yinggong = yinggong;
        var qinggong = new FunctionButton("qinggong",{x:420-1000,y:32-1000},"qinggong",_this.mainFunction,_this.dazaFunction,_this.jibengongFunction,_this.chuangdangFunction,_this.currentStatus,_this.gameLayer,_this.bg);
        _this.functionLayer.addChild(qinggong,g_GameZOder.front_panel);
        _this.jibengongFunction.qinggong = qinggong;
        var neigong = new FunctionButton("neigong",{x:520-1000,y:32-1000},"neigong",_this.mainFunction,_this.dazaFunction,_this.jibengongFunction,_this.chuangdangFunction,_this.currentStatus,_this.gameLayer,_this.bg);
        _this.functionLayer.addChild(neigong,g_GameZOder.front_panel);
        _this.jibengongFunction.neigong = neigong;
        _this.jibengongFunction.fanhui = fanhui;

        var menpainei = new FunctionButton("menpainei",{x:20-1000,y:32-1000},"menpainei",_this.mainFunction,_this.dazaFunction,_this.jibengongFunction,_this.chuangdangFunction,_this.currentStatus,_this.gameLayer,_this.bg);
        _this.functionLayer.addChild(menpainei,g_GameZOder.front_panel);
        _this.chuangdangFunction.menpainei = menpainei;
        var chengzhen = new FunctionButton("chengzhen",{x:220-1000,y:32-1000},"chengzhen",_this.mainFunction,_this.dazaFunction,_this.jibengongFunction,_this.chuangdangFunction,_this.currentStatus,_this.gameLayer,_this.bg);
        _this.functionLayer.addChild(chengzhen,g_GameZOder.front_panel);
        _this.chuangdangFunction.chengzhen = chengzhen;
        var senlin = new FunctionButton("senlin",{x:320-1000,y:32-1000},"senlin",_this.mainFunction,_this.dazaFunction,_this.jibengongFunction,_this.chuangdangFunction,_this.currentStatus,_this.gameLayer,_this.bg);
        _this.functionLayer.addChild(senlin,g_GameZOder.front_panel);
        _this.chuangdangFunction.senlin = senlin;
        var jiuguan = new FunctionButton("jiuguan",{x:420-1000,y:32-1000},"jiuguan",_this.mainFunction,_this.dazaFunction,_this.jibengongFunction,_this.chuangdangFunction,_this.currentStatus,_this.gameLayer,_this.bg);
        _this.functionLayer.addChild(jiuguan,g_GameZOder.front_panel);
        _this.chuangdangFunction.jiuguan = jiuguan;
        var shangdian = new FunctionButton("shangdian",{x:520-1000,y:32-1000},"shangdian",_this.mainFunction,_this.dazaFunction,_this.jibengongFunction,_this.chuangdangFunction,_this.currentStatus,_this.gameLayer,_this.bg);
        _this.functionLayer.addChild(shangdian,g_GameZOder.front_panel);
        _this.chuangdangFunction.shangdian = shangdian;
        var yizhan = new FunctionButton("yizhan",{x:620-1000,y:32-1000},"yizhan",_this.mainFunction,_this.dazaFunction,_this.jibengongFunction,_this.chuangdangFunction,_this.currentStatus,_this.gameLayer,_this.bg);
        _this.functionLayer.addChild(yizhan,g_GameZOder.front_panel);
        _this.chuangdangFunction.yizhan = yizhan;
        _this.chuangdangFunction.fanhui = fanhui;

    },
    paintHeadAndName:function(_this){
        var head = cc.Sprite.create("res/Q/"+_this.me.img.dir.replace('/',".png"));
        head.setAnchorPoint(cc.p(0,0));
        head.setPosition(35,490);
        _this.gameLayer.addChild(head,g_GameZOder.front_panel);
        var name = new cc.LabelTTF(_this.me.name,"仿宋", 26);
        name.setColor(cc.color(0,0,0,0));
        name.setAnchorPoint(cc.p(0,0));
        name.setPosition(170,500);
        _this.gameLayer.addChild(name,g_GameZOder.front_panel);
    },
    paintGongfu : function(_this){
        var label = new cc.LabelTTF("绝\n招\n ：","仿宋", 26);
        label.setColor(cc.color(0,0,0,0));
        label.setAnchorPoint(cc.p(0,0));
        label.setPosition(65,340);
        _this.gameLayer.addChild(label,g_GameZOder.front_panel);
        var gongfupre = _this.me.gongfu.name;
        var gongfuafter = "";
        for(var i=0;i<gongfupre.length;i++)
        {
            gongfuafter=gongfuafter+gongfupre.substring(i,(i+1))+"\n";
        }
        var gongfu = new cc.LabelTTF(gongfuafter,"仿宋", 26);
        gongfu.setColor(cc.color(0,0,0,0));
        gongfu.setAnchorPoint(cc.p(0,1));
        gongfu.setPosition(65,330);
        _this.gameLayer.addChild(gongfu,g_GameZOder.front_panel);
    },
    paintDate : function(_this){

    },
    paintFunction : function(_this){

    },
    paintAttr:function(_this){
        _this.attr = new AttributeSprite(_this.me,_this.attrLayer);
        _this.attrLayer.addChild(_this.attr,g_GameZOder.ui);
    },
    gotoNextScene:function(){
        if(this.gameLayer==null){
            return;
        }
        this.has = true;
        this.attr.cleanAllSprite();
        this.attrLayer.removeChild(this.attr);
        cc.director.runScene(new FightScene(this.talk));
    },
    onExit:function(){
        this._super();
        this.removeAllChildren();
        this.attr = null;
        this.attrLayer = null;
        this.functionLayer = null;
        this.gameLayer=null;
        this.talkLayer = null;
    }
});