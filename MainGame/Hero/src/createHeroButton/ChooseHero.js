/**
 * Created by MM on 2015/11/27 0027.
 */
/**
 * Created by MM on 2015/11/26 0026.
 */

var ChooseHero = cc.Sprite.extend({
    ctor : function (name,allPersonCompare,position,gameLayer,parent) {
        this._super();
        this.initWithFile("res/Q/"+allPersonCompare[name]+".png");
        this.setAnchorPoint(cc.p(0,0));
        this.setPosition(position.x,position.y);
        gameLayer.addChild(this);
        this.mouseListener(name,parent);
    },
    mouseListener : function(name,parent){
        cc.eventManager.addListener(cc.EventListener.create({
            event : cc.EventListener.MOUSE,
            onMouseDown : function(event) {
                var pos = event.getLocation(); //当前事件发生的光标位置
                var target = event.getCurrentTarget(); //事件绑定的目标
                //判断当前事件发生的位置是否在事件目标区域内
                if( cc.rectContainsPoint(target.getBoundingBox(), pos) ) {
                    parent.sendBaseHero(name);
                    return true;
                }
                return false;
            }
        }), this);
    }
});