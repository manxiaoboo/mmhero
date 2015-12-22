/**
 * Created by MM on 2015/11/30 0030.
 */
var HeroImage = cc.Sprite.extend({
    parents:null,
    ctor : function (hero,parent) {
        this._super();
        var filename = hero.img.dir;
        this.initWithFile("res/Q/"+filename.replace('/',".png"));
        this.setAnchorPoint(cc.p(0,0));
        this.setPosition(168,300);
        this.parents = parent;
        this.mouseListener();

    },
    mouseListener : function(){
        var _this = this;
        cc.eventManager.addListener(cc.EventListener.create({
            event : cc.EventListener.MOUSE,
            onMouseDown : function(event) {
                var pos = event.getLocation(); //当前事件发生的光标位置
                var target = event.getCurrentTarget(); //事件绑定的目标
                //判断当前事件发生的位置是否在事件目标区域内
                if( cc.rectContainsPoint(target.getBoundingBox(), pos) ) {
                    _this.parents.goNextScene();
                    return true;
                }
                return false;
            }
        }), this);
    }
});