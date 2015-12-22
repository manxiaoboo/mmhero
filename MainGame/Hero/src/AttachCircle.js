/**
 * Created by MM on 2015/11/18 0018.
 */
var AttachCircle = cc.Sprite.extend({
    _radians:0,
    speed : null,
    me : null,
    status:null,
    isvisible:false,
    currentPerson:null,
    persons:null,
    ctor:function (me,status,currentPerson,persons) {
        this._super();
        this.me = me;
        this.setPosition(this.me.currentPosition.x,this.me.currentPosition.y);
        this.status = status;
        this.setVisible(false);
        this.currentPerson = currentPerson;
        this.persons = persons;
        this.initWithFile(ui_move_attach,cc.rect(0, 0, this.me.gongfu.radius.len, this.me.gongfu.radius.len));
        this.mouseListener();

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
                    if(_this.status.value!=2)return false;
                    _this.status.value = 0;
                    _this.setPosition(_this.me.currentPosition.x,_this.me.currentPosition.y);
                    _this.isvisible = false;
                    _this.setVisible(false);
                    return true;
                }
                return false;
            }
        }), this);
    }
});