/**
 * Created by MM on 2015/11/26 0026.
 */

var CreateHeroButton = cc.Sprite.extend({
    ctor : function () {
        this._super();
        this.initWithFile(ui_createHero);
        this.setAnchorPoint(cc.p(0,0));
        this.setPosition(368,300);
        this.mouseListener();

    },
    mouseListener : function(){
    cc.eventManager.addListener(cc.EventListener.create({
        event : cc.EventListener.MOUSE,
        onMouseDown : function(event) {
            var pos = event.getLocation(); //当前事件发生的光标位置
            var target = event.getCurrentTarget(); //事件绑定的目标
            //判断当前事件发生的位置是否在事件目标区域内
            if( cc.rectContainsPoint(target.getBoundingBox(), pos) ) {
                cc.director.runScene(new CreateHeroScene());

                return true;
            }
            return false;
        }
    }), this);
}
});