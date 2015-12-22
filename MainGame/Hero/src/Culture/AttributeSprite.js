/**
 * Created by MM on 2015/12/1 0001.
 */
var AttributeSprite = cc.Sprite.extend({
    page1:new Array(),
    page2:new Array(),
    flag:false,
    page1x:10,
    page2x:9999,
    test:null,
    ctor : function (me,gameLayer) {
        this._super();
        this.setAnchorPoint(cc.p(0,1));
        this.setPosition(340,590);
        this.mouseListener();
        this.setContentSize(500,150);
        this.test = gameLayer;
        this.page1 = [];
        this.page2 = [];
        this.init1(me,gameLayer);
        this.init2(me,gameLayer);

    },
    init1 : function(me,gameLayer){
        var yanli = new cc.LabelTTF(this.handle("眼功：",me.yanli),"仿宋", 16);
        yanli.setColor(cc.color(0,0,0,0));
        yanli.setAnchorPoint(cc.p(0,1));
        yanli.setPosition(this.page1x,0);
        gameLayer.addChild(yanli,g_GameZOder.front_panel);this.page1.push(yanli);

        var erli = new cc.LabelTTF(this.handle("耳功：",me.erli),"仿宋", 16);
        erli.setColor(cc.color(0,0,0,0));
        erli.setAnchorPoint(cc.p(0,1));
        erli.setPosition(this.page1x+25,0);
        gameLayer.addChild(erli,g_GameZOder.front_panel);this.page1.push(erli);
        var ruangong = new cc.LabelTTF(this.handle("软功：",me.ruangong),"仿宋", 16);
        ruangong.setColor(cc.color(0,0,0,0));
        ruangong.setAnchorPoint(cc.p(0,1));
        ruangong.setPosition(this.page1x+50,0);
        gameLayer.addChild(ruangong,g_GameZOder.front_panel);this.page1.push(ruangong);
        var yinggong = new cc.LabelTTF(this.handle("硬功：",me.yinggong),"仿宋", 16);
        yinggong.setColor(cc.color(0,0,0,0));
        yinggong.setAnchorPoint(cc.p(0,1));
        yinggong.setPosition(this.page1x+75,0);
        gameLayer.addChild(yinggong,g_GameZOder.front_panel);this.page1.push(yinggong);
        var qinggong = new cc.LabelTTF(this.handle("轻功：",me.speed),"仿宋", 16);
        qinggong.setColor(cc.color(0,0,0,0));
        qinggong.setAnchorPoint(cc.p(0,1));
        qinggong.setPosition(this.page1x+100,0);
        gameLayer.addChild(qinggong,g_GameZOder.front_panel);this.page1.push(qinggong);
        var neigong = new cc.LabelTTF(this.handle("内功：",me.neigong),"仿宋", 16);
        neigong.setColor(cc.color(0,0,0,0));
        neigong.setAnchorPoint(cc.p(0,1));
        neigong.setPosition(this.page1x+125,0);
        gameLayer.addChild(neigong,g_GameZOder.front_panel);this.page1.push(neigong);
        var quanfa = new cc.LabelTTF(this.handle("拳法：",me.quanfa),"仿宋", 16);
        quanfa.setColor(cc.color(0,0,0,0));
        quanfa.setAnchorPoint(cc.p(0,1));
        quanfa.setPosition(this.page1x+150,0);
        gameLayer.addChild(quanfa,g_GameZOder.front_panel);this.page1.push(quanfa);
        var zhangfa = new cc.LabelTTF(this.handle("掌法：",me.zhangfa),"仿宋", 16);
        zhangfa.setColor(cc.color(0,0,0,0));
        zhangfa.setAnchorPoint(cc.p(0,1));
        zhangfa.setPosition(this.page1x+175,0);
        gameLayer.addChild(zhangfa,g_GameZOder.front_panel);this.page1.push(zhangfa);
        var zhifa = new cc.LabelTTF(this.handle("指法：",me.zhifa),"仿宋", 16);
        zhifa.setColor(cc.color(0,0,0,0));
        zhifa.setAnchorPoint(cc.p(0,1));
        zhifa.setPosition(this.page1x+200,0);
        gameLayer.addChild(zhifa,g_GameZOder.front_panel);this.page1.push(zhifa);
        var tuifa = new cc.LabelTTF(this.handle("腿法：",me.tuifa),"仿宋", 16);
        tuifa.setColor(cc.color(0,0,0,0));
        tuifa.setAnchorPoint(cc.p(0,1));
        tuifa.setPosition(this.page1x+225,0);
        gameLayer.addChild(tuifa,g_GameZOder.front_panel);this.page1.push(tuifa);
        var jianfa = new cc.LabelTTF(this.handle("剑法：",me.jianfa),"仿宋", 16);
        jianfa.setColor(cc.color(0,0,0,0));
        jianfa.setAnchorPoint(cc.p(0,1));
        jianfa.setPosition(this.page1x+250,0);
        gameLayer.addChild(jianfa,g_GameZOder.front_panel);this.page1.push(jianfa);
        var daofa = new cc.LabelTTF(this.handle("刀法：",me.daofa),"仿宋", 16);
        daofa.setColor(cc.color(0,0,0,0));
        daofa.setAnchorPoint(cc.p(0,1));
        daofa.setPosition(this.page1x+275,0);
        gameLayer.addChild(daofa,g_GameZOder.front_panel);this.page1.push(daofa);
        var gunfa = new cc.LabelTTF(this.handle("棍法：",me.gunfa),"仿宋", 16);
        gunfa.setColor(cc.color(0,0,0,0));
        gunfa.setAnchorPoint(cc.p(0,1));
        gunfa.setPosition(this.page1x+300,0);
        gameLayer.addChild(gunfa,g_GameZOder.front_panel);this.page1.push(gunfa);
        var anqi = new cc.LabelTTF(this.handle("暗器：",me.anqi),"仿宋", 16);
        anqi.setColor(cc.color(0,0,0,0));
        anqi.setAnchorPoint(cc.p(0,1));
        anqi.setPosition(this.page1x+325,0);
        gameLayer.addChild(anqi,g_GameZOder.front_panel);this.page1.push(anqi);
        var wuxue = new cc.LabelTTF(this.handle("武学：",me.wuxuezhishi),"仿宋", 16);
        wuxue.setColor(cc.color(0,0,0,0));
        wuxue.setAnchorPoint(cc.p(0,1));
        wuxue.setPosition(this.page1x+350,0);
        gameLayer.addChild(wuxue,g_GameZOder.front_panel);this.page1.push(wuxue);
        var shizhan = new cc.LabelTTF(this.handle("实战：",me.jianghujingyan),"仿宋", 16);
        shizhan.setColor(cc.color(0,0,0,0));
        shizhan.setAnchorPoint(cc.p(0,1));
        shizhan.setPosition(this.page1x+375,0);
        gameLayer.addChild(shizhan,g_GameZOder.front_panel);this.page1.push(shizhan);
        var wuxing = new cc.LabelTTF(this.handle("悟性：",me.wuxing),"仿宋", 16);
        wuxing.setColor(cc.color(0,0,0,0));
        wuxing.setAnchorPoint(cc.p(0,1));
        wuxing.setPosition(this.page1x+400,0);
        gameLayer.addChild(wuxing,g_GameZOder.front_panel);this.page1.push(wuxing);
    },
    init2 : function(me,gameLayer){
        var yinyue = new cc.LabelTTF(this.handle("音乐：",me.yinlv),"仿宋", 16);
        yinyue.setColor(cc.color(0,0,0,0));
        yinyue.setAnchorPoint(cc.p(0,1));
        yinyue.setPosition(this.page2x,0);
        gameLayer.addChild(yinyue,g_GameZOder.front_panel);this.page2.push(yinyue);
        var qiyi = new cc.LabelTTF(this.handle("棋艺：",me.qidao),"仿宋", 16);
        qiyi.setColor(cc.color(0,0,0,0));
        qiyi.setAnchorPoint(cc.p(0,1));
        qiyi.setPosition(this.page2x+25,0);
        gameLayer.addChild(qiyi,g_GameZOder.front_panel);this.page2.push(qiyi);
        var shufa = new cc.LabelTTF(this.handle("书法：",me.shufa),"仿宋", 16);
        shufa.setColor(cc.color(0,0,0,0));
        shufa.setAnchorPoint(cc.p(0,1));
        shufa.setPosition(this.page2x+50,0);
        gameLayer.addChild(shufa,g_GameZOder.front_panel);this.page2.push(shufa);
        var huihua = new cc.LabelTTF(this.handle("绘画：",me.huihua),"仿宋", 16);
        huihua.setColor(cc.color(0,0,0,0));
        huihua.setAnchorPoint(cc.p(0,1));
        huihua.setPosition(this.page2x+75,0);
        gameLayer.addChild(huihua,g_GameZOder.front_panel);this.page2.push(huihua);
        var yishu = new cc.LabelTTF(this.handle("医术：",me.yixue),"仿宋", 16);
        yishu.setColor(cc.color(0,0,0,0));
        yishu.setAnchorPoint(cc.p(0,1));
        yishu.setPosition(this.page2x+100,0);
        gameLayer.addChild(yishu,g_GameZOder.front_panel);this.page2.push(yishu);
        var dugong = new cc.LabelTTF(this.handle("毒术：",me.dugong),"仿宋", 16);
        dugong.setColor(cc.color(0,0,0,0));
        dugong.setAnchorPoint(cc.p(0,1));
        dugong.setPosition(this.page2x+125,0);
        gameLayer.addChild(dugong,g_GameZOder.front_panel);this.page2.push(dugong);
        var tiejiang = new cc.LabelTTF(this.handle("铁匠：",0),"仿宋", 16);
        tiejiang.setColor(cc.color(0,0,0,0));
        tiejiang.setAnchorPoint(cc.p(0,1));
        tiejiang.setPosition(this.page2x+150,0);
        gameLayer.addChild(tiejiang,g_GameZOder.front_panel);this.page2.push(tiejiang);
        var jianding = new cc.LabelTTF(this.handle("鉴定：",0),"仿宋", 16);
        jianding.setColor(cc.color(0,0,0,0));
        jianding.setAnchorPoint(cc.p(0,1));
        jianding.setPosition(this.page2x+175,0);
        gameLayer.addChild(jianding,g_GameZOder.front_panel);this.page2.push(jianding);
        var dalie = new cc.LabelTTF(this.handle("打猎：",0),"仿宋", 16);
        dalie.setColor(cc.color(0,0,0,0));
        dalie.setAnchorPoint(cc.p(0,1));
        dalie.setPosition(this.page2x+200,0);
        gameLayer.addChild(dalie,g_GameZOder.front_panel);this.page2.push(dalie);
        var diaoyu = new cc.LabelTTF(this.handle("钓鱼：",0),"仿宋", 16);
        diaoyu.setColor(cc.color(0,0,0,0));
        diaoyu.setAnchorPoint(cc.p(0,1));
        diaoyu.setPosition(this.page2x+225,0);
        gameLayer.addChild(diaoyu,g_GameZOder.front_panel);this.page2.push(diaoyu);
        var huahui = new cc.LabelTTF(this.handle("花卉：",0),"仿宋", 16);
        huahui.setColor(cc.color(0,0,0,0));
        huahui.setAnchorPoint(cc.p(0,1));
        huahui.setPosition(this.page2x+250,0);
        gameLayer.addChild(huahui,g_GameZOder.front_panel);this.page2.push(huahui);
        var chadao = new cc.LabelTTF(this.handle("茶道：",me.chadao),"仿宋", 16);
        chadao.setColor(cc.color(0,0,0,0));
        chadao.setAnchorPoint(cc.p(0,1));
        chadao.setPosition(this.page2x+275,0);
        gameLayer.addChild(chadao,g_GameZOder.front_panel);this.page2.push(chadao);
        var yinjiu = new cc.LabelTTF(this.handle("饮酒：",0),"仿宋", 16);
        yinjiu.setColor(cc.color(0,0,0,0));
        yinjiu.setAnchorPoint(cc.p(0,1));
        yinjiu.setPosition(this.page2x+300,0);
        gameLayer.addChild(yinjiu,g_GameZOder.front_panel);this.page2.push(yinjiu);
        var chuyi = new cc.LabelTTF(this.handle("厨艺：",0),"仿宋", 16);
        chuyi.setColor(cc.color(0,0,0,0));
        chuyi.setAnchorPoint(cc.p(0,1));
        chuyi.setPosition(this.page2x+325,0);
        gameLayer.addChild(chuyi,g_GameZOder.front_panel);this.page2.push(chuyi);
        var mingsheng = new cc.LabelTTF(this.handle("名望：",0),"仿宋", 16);
        mingsheng.setColor(cc.color(0,0,0,0));
        mingsheng.setAnchorPoint(cc.p(0,1));
        mingsheng.setPosition(this.page2x+375,0);
        gameLayer.addChild(mingsheng,g_GameZOder.front_panel);this.page2.push(mingsheng);
        var daode = new cc.LabelTTF(this.handle("道德：",50),"仿宋", 16);
        daode.setColor(cc.color(0,0,0,0));
        daode.setAnchorPoint(cc.p(0,1));
        daode.setPosition(this.page2x+400,0);
        gameLayer.addChild(daode,g_GameZOder.front_panel);this.page2.push(daode);
    },
    handle:function(label,number){
        var k = new change(number+"");
        label+=k.pri_ary()==""?"零":k.pri_ary();
        var after = "";
        for(var i=0;i<label.length;i++)
        {
            after=after+label.substring(i,(i+1))+"\n";
        }
        return after;
    },
    toggle:function(_this){

        if(_this.flag){
            _this.page2x = 9999;
            _this.page1x = 10;
        }else{
            _this.page2x = 10;
            _this.page1x = 9999;
        }
        _this.flag = !_this.flag;
        for(var o=0;o<_this.page1.length;o++){
            _this.page1[o].setPosition(_this.page1x+o*25,0);
        }
        for(var o=0;o<_this.page2.length;o++){
            _this.page2[o].setPosition(_this.page2x+o*25,0);
        }
    },
    mouseListener : function() {
        var _this = this;
        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.MOUSE,
            onMouseDown: function (event) {
                var pos = event.getLocation(); //当前事件发生的光标位置
                var target = event.getCurrentTarget(); //事件绑定的目标
                //判断当前事件发生的位置是否在事件目标区域内
                if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                    _this.toggle(_this);
                    return true;
                }
                return false;
            }
        }), this);
    },
    cleanAllSprite:function(){
        var _this = this;
        for(var o=0;o<_this.page1.length;o++){
           _this.page1[o].removeFromParent();
        }
        for(var o=0;o<_this.page2.length;o++){
            _this.page2[o].removeFromParent();
        }
        _this.page1 = [];
        _this.page2 = [];
    }

});

var _change = {
    ary0:["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
    ary1:["", "十", "百", "千"],
    ary2:["", "万", "亿", "兆"],
    init:function (name) {
        this.name = name;
    },
    strrev:function () {
        var ary = []
        for (var i = this.name.length; i >= 0; i--) {
            ary.push(this.name[i])
        }
        return ary.join("");
    }, //倒转字符串。
    pri_ary:function () {
        var $this = this
        var ary = this.strrev();
        var zero = ""
        var newary = ""
        var i4 = -1
        for (var i = 0; i < ary.length; i++) {
            if (i % 4 == 0) { //首先判断万级单位，每隔四个字符就让万级单位数组索引号递增
                i4++;
                newary = this.ary2[i4] + newary; //将万级单位存入该字符的读法中去，它肯定是放在当前字符读法的末尾，所以首先将它叠加入$r中，
                zero = ""; //在万级单位位置的“0”肯定是不用的读的，所以设置零的读法为空

            }
            //关于0的处理与判断。
            if (ary[i] == '0') { //如果读出的字符是“0”，执行如下判断这个“0”是否读作“零”
                switch (i % 4) {
                    case 0:
                        break;
                    //如果位置索引能被4整除，表示它所处位置是万级单位位置，这个位置的0的读法在前面就已经设置好了，所以这里直接跳过
                    case 1:
                    case 2:
                    case 3:
                        if (ary[i - 1] != '0') {
                            zero = "零"
                        }
                        ; //如果不被4整除，那么都执行这段判断代码：如果它的下一位数字（针对当前字符串来说是上一个字符，因为之前执行了反转）也是0，那么跳过，否则读作“零”
                        break;

                }
                newary = zero + newary;
                zero = '';
            }
            else { //如果不是“0”
                newary = this.ary0[parseInt(ary[i])] + this.ary1[i % 4] + newary; //就将该当字符转换成数值型,并作为数组ary0的索引号,以得到与之对应的中文读法，其后再跟上它的的一级单位（空、十、百还是千）最后再加上前面已存入的读法内容。
            }

        }
        if (newary.indexOf("零") == 0) {
            newary = newary.substr(1)
        }//处理前面的0
        return newary;
    }
}
//创建class类
function change() {
    this.init.apply(this, arguments);
}
change.prototype = _change
