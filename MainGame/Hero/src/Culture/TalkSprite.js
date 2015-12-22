/**
 * Created by MM on 2015/12/10 0010.
 */
/**
 * Created by MM on 2015/12/1 0001.
 */
var TalkSprite = cc.Sprite.extend({
    talk:null,
    head_l:null,
    currentTalk:null,
    index:0,
    status:null,
    functionLayer:null,
    father:null,
    ctor : function (talk,status,functionLayer,father) {
        this._super();
        this.initWithFile("res/Culture/talkleft.png");
        this.setAnchorPoint(cc.p(0,0));
        this.setPosition(0,0);
        this.mouseListener();
        this.talk = talk;
        this.status = status;
        this.functionLayer = functionLayer;
        this.father = father;
        this.startTalk();
    },
    setTalk:function(talk){
        this.talk = talk;
        this.setPosition(0,0);
        this.setVisible(true);
        this.index = 0;
        this.startTalk();
    },
    startTalk:function(){
        if(this.index>=this.talk.talk.length){
            this.setPosition(-9999,-9999);
            this.setVisible(false);
            this.functionLayer.setVisible(true);
            this.status.status = "normal";
            this.index = 0;
//            cc.director.pushScene(new FightScene(this.talk));
            cc.log(this.talk);
            if(this.talk.group==null||this.talk.group=="undefined"||this.talk.group==""){
                cc.log("什么都没发生");
            }else{
                this.father.gotoNextScene();
            }
            }else{
            if(this.currentTalk!=null){
                this.removeAllChildren(this.currentTalk);
            }
            if(this.head_l!=null){
                this.removeAllChildren(this.head_l);
            }
            this.head_l =cc.Sprite.create("res/Q/"+this.talk.talk[this.index].img+"-l.png");
            this.head_l.setAnchorPoint(cc.p(0,0));
            this.head_l.setPosition(120,150);
            this.addChild(this.head_l,-20);

            this.currentTalk = new cc.LabelTTF(this.talk.talk[this.index].name+"："+this.talk.talk[this.index].text, "仿宋", 25);
                this.currentTalk.setAnchorPoint(cc.p(0,1));
                this.currentTalk.setPosition(20,120);
                this.addChild(this.currentTalk);

            this.index++;
        }
    },
    mouseListener : function(name,parent) {
        var _this = this;
        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.MOUSE,
            onMouseDown: function (event) {
                var pos = event.getLocation(); //当前事件发生的光标位置
                var target = event.getCurrentTarget(); //事件绑定的目标
                //判断当前事件发生的位置是否在事件目标区域内
                if (cc.rectContainsPoint(target.getBoundingBox(), pos)) {
                    _this.startTalk();
                    return true;
                }
                return false;
            }
        }), this);
    }

});

