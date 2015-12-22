/**
 * Created by MM on 2015/11/22 0022.
 */
var AnimationSprite = cc.Sprite.extend({

    ctor : function () {
        this._super();
        this.setAnchorPoint(cc.p(0.5,0.2));
    },
    doAction : function(person,currentPerson){
        this.setPosition(person.currentPosition.x,person.currentPosition.y);
            var animation = cc.Animation.create();
            for (var o = 1;o <= currentPerson.img.fightCount;o++) {
                animation.addSpriteFrameWithFile("res/"+currentPerson.img.dir+"fight"+o+".png");
            }
            animation.setDelayPerUnit(0.08);
            animation.setRestoreOriginalFrame(false);
        var action = cc.Animate.create(animation);
        this.runAction(cc.Sequence.create(action));

        var inter = setInterval(function(){
            if(action.isDone()){
                currentPerson.hasrest = true;
                action = null;
                animation = null;
                clearInterval(inter);
            }
        },0.5);

    }
});