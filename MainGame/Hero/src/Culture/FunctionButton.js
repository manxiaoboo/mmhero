/**
 * Created by MM on 2015/12/4 0004.
 */

var FunctionButton  = cc.Sprite.extend({
    mainFunction:null,
    dazaFunction:null,
    jibengongFunction:null,
    chuangdangFunction:null,
    status:null,
    gameLayer:null,
    bg:null,
    ctor : function (img,position,func,mainFunction,dazaFunction,jibengongFunction,chuangdangFunction,status,gameLayer,bg) {
        this._super();
        this.mainFunction = mainFunction;
        this.dazaFunction = dazaFunction;
        this.jibengongFunction = jibengongFunction;
        this.chuangdangFunction = chuangdangFunction;
        this.status = status;
        this.gameLayer = gameLayer;
        this.bg = bg;
        this.initWithFile("res/Culture/Button/"+img+".png");
        this.setAnchorPoint(cc.p(0,0));
        this.setPosition(position.x,position.y);
        this.mouseListener(func);

    },
    mouseListener : function(func){
        var _this = this;
        cc.eventManager.addListener(cc.EventListener.create({
            event : cc.EventListener.MOUSE,
            onMouseDown : function(event) {
                var pos = event.getLocation(); //当前事件发生的光标位置
                var target = event.getCurrentTarget(); //事件绑定的目标
                //判断当前事件发生的位置是否在事件目标区域内
                if( cc.rectContainsPoint(target.getBoundingBox(), pos) ) {
                    if(_this.status.status=="talk")return false;
                    _this.chooseFunction(_this,func);
                    cc.log(func);
                    return true;
                }
                return false;
            }
        }), this);
    },
    chooseFunction : function(_this,func){
        var _this = _this;
        switch(func){
            case 'daza':
                allHidden();
                for(var o in _this.dazaFunction){
                    _this.dazaFunction[o].setVisible(true);
                    _this.dazaFunction[o].setPosition(_this.dazaFunction[o].getPosition().x+1000,_this.dazaFunction[o].getPosition().y+1000);
                }
                break;
            case 'fanhui':
                allHidden();
                for(var o in _this.mainFunction) {
                    _this.mainFunction[o].setVisible(true);
                    _this.mainFunction[o].setPosition(_this.mainFunction[o].getPosition().x + 1000, _this.mainFunction[o].getPosition().y + 1000);
                }
                break;
            case 'chuangdang':
                allHidden();
                for(var o in _this.chuangdangFunction) {
                    _this.chuangdangFunction[o].setVisible(true);
                    _this.chuangdangFunction[o].setPosition(_this.chuangdangFunction[o].getPosition().x + 1000, _this.chuangdangFunction[o].getPosition().y + 1000);
                }
                break;
            case 'chengzhen':
                cc.audioEngine.stopAllEffects();
                cc.audioEngine.stopMusic();
                _this.gameLayer.removeChild(_this.bg);
                var bg2 = cc.Sprite.create("res/Culture/city.jpg");
                bg2.setAnchorPoint(cc.p(0,0));
                bg2.setPosition(140,130);
                _this.gameLayer.addChild(bg2,0);
                _sioClient.emit("chuangdang",{where:"chengzhen",name:sessionStorage.getItem("currentHero")});
                break;
            case 'jiuguan' :
                _this.gameLayer.removeChild(_this.bg);
                var bg2 = cc.Sprite.create("res/Culture/jiuguan.jpg");
                bg2.setAnchorPoint(cc.p(0,0));
                bg2.setPosition(140,130);
                _this.gameLayer.addChild(bg2,0);
                _sioClient.emit("chuangdang",{where:"jiuguan",name:sessionStorage.getItem("currentHero")});
                break;
        }
        function allHidden(){
            for(var o in _this.dazaFunction){
                if(_this.dazaFunction[o].getPosition().x<=0){break;}
                _this.dazaFunction[o].setVisible(false);
                _this.dazaFunction[o].setPosition(_this.dazaFunction[o].getPosition().x-1000,_this.dazaFunction[o].getPosition().y-1000);
            }
            for(var o in _this.chuangdangFunction){
                if(_this.chuangdangFunction[o].getPosition().x<=0){break;}
                _this.chuangdangFunction[o].setVisible(false);
                _this.chuangdangFunction[o].setPosition(_this.chuangdangFunction[o].getPosition().x-1000,_this.chuangdangFunction[o].getPosition().y-1000);
            }
            for(var o in _this.mainFunction){
                if(_this.mainFunction[o].getPosition().x<=0){break;}
                _this.mainFunction[o].setVisible(false);
                _this.mainFunction[o].setPosition(_this.mainFunction[o].getPosition().x-1000,_this.mainFunction[o].getPosition().y-1000);
            }
        }
    }
});