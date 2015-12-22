/**
 * Created by MM on 2015/11/16 0016.
 */

var moveBtn = cc.Sprite.extend({
    currentStatus : null,
    me : null,
    gameLayer : null,
    circle : null,
    ctor:function(currentStatus,me,gameLayer,circle){
        this._super();
        this.mouseListener();
        this.initData(currentStatus,me,gameLayer,circle);
    },
    initData : function(currentStatus,me,gameLayer,circle){
        this.initWithFile(ui_fight_move);
        this.setPosition(610,490);
        this.setAnchorPoint(cc.p(0.5,0));
        this.currentStatus = currentStatus;
        this.me = me;
        this.gameLayer = gameLayer;
        this.circle = circle;
    },
    mouseListener : function(){
        var _this = this;
        cc.eventManager.addListener(cc.EventListener.create({
            event : cc.EventListener.MOUSE,
            onMouseDown : function(event) {
                var pos = event.getLocation(); //当前事件发生的光标位置
                var target = event.getCurrentTarget(); //事件绑定的目标
                if( cc.rectContainsPoint(target.getBoundingBox(), pos) ) {
                    _this.currentStatus.value = 1;
                    _this.toggleCircle();
                    return true;
                }
                return false;
            }
        }), this);
    },
    toggleCircle : function(){
        if(this.me.hasmoved)return;
        if(this.circle.isvisible){
            this.circle.setVisible(false);
            this.circle.isvisible = false;
        }else{
            this.circle.setVisible(true);
            this.circle.isvisible = true;
        }
    }

});

var attachBtn = cc.Sprite.extend({
    currentStatus : null,
    me : null,
    gameLayer : null,
    attachCircle : null,
    ctor:function(currentStatus,me,gameLayer,attachCircle){
        this._super();
        this.initData(currentStatus,me,gameLayer,attachCircle);
        this.mouseListener();
    },
    initData : function(currentStatus,me,gameLayer,attachCircle){
        this.initWithFile(ui_fight_attach);
        this.setPosition(655,490);
        this.setAnchorPoint(cc.p(0.5,0));
        this.currentStatus = currentStatus;
        this.me = me;
        this.gameLayer = gameLayer;
        this.attachCircle = attachCircle;
    },
    mouseListener : function(){
        var _this = this;
        cc.eventManager.addListener(cc.EventListener.create({
            event : cc.EventListener.MOUSE,
            onMouseDown : function(event) {
                var pos = event.getLocation(); //当前事件发生的光标位置
                var target = event.getCurrentTarget(); //事件绑定的目标
                if( cc.rectContainsPoint(target.getBoundingBox(), pos) ) {
                    if(_this.me.hasattach)return false;
                    _this.currentStatus.value = 2;
                    _this.toggleCircle();
                    return true;
                }
                return false;
            }
        }), this);
    },
    toggleCircle : function(){
        this.attachCircle.setPosition(this.me.currentPosition.x,this.me.currentPosition.y);
        if(this.me.hasattach)return;
        if(this.attachCircle.isvisible){
            this.attachCircle.setVisible(false);
            this.attachCircle.isvisible = false;
            this.currentStatus.value = 0;
        }else{
            this.attachCircle.setVisible(true);
            this.attachCircle.isvisible = true;
            this.currentStatus.value = 2;
        }
    }
});

var medicineBtn = cc.Sprite.extend({
    currentStatus : null,
    me : null,
    gameLayer : null,
    ctor:function(currentStatus,me,gameLayer){
        this._super();
        this.initData(currentStatus,me,gameLayer);
    },
    initData : function(currentStatus,me,gameLayer){
        this.initWithFile(ui_fight_medicine);
        this.setPosition(700,490);
        this.setAnchorPoint(cc.p(0.5,0));
        this.currentStatus = currentStatus;
        this.me = me;
        this.gameLayer = gameLayer;
    }

});

var restBtn = cc.Sprite.extend({
    currentStatus : null,
    me : null,
    gameLayer : null,
    ctor:function(currentStatus,me,gameLayer){
        this._super();
        this.initData(currentStatus,me,gameLayer);
        this.mouseListener();
    },
    initData : function(currentStatus,me,gameLayer) {
        this.initWithFile(ui_fight_rest);
        this.setPosition(745, 490);
        this.setAnchorPoint(cc.p(0.5,0));
        this.currentStatus = currentStatus;
        this.me = me;
        this.gameLayer = gameLayer;
    },
    mouseListener : function(){
        var _this = this;
        cc.eventManager.addListener(cc.EventListener.create({
            event : cc.EventListener.MOUSE,
            onMouseDown : function(event) {
                var pos = event.getLocation(); //当前事件发生的光标位置
                var target = event.getCurrentTarget(); //事件绑定的目标
                if( cc.rectContainsPoint(target.getBoundingBox(), pos) ) {
                    if(_this.me.hasattach)return false;
                    _this.currentStatus.value = 4;
                    _this.me.hasrest = true;
                    return true;
                }
                return false;
            }
        }), this);
    }
});