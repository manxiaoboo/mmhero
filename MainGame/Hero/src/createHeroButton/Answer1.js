/**
 * Created by MM on 2015/11/27 0027.
 */
/**
 * Created by MM on 2015/11/26 0026.
 */

var Answer = cc.Sprite.extend({
    answer:null,
    ctor : function (text,position,id,gameLayer,allPersons,currentPersons,questionLabel,parent) {
        this._super();
        this.setAnchorPoint(cc.p(0,0));
        this.mouseListener(text,position,id,gameLayer,allPersons,currentPersons,questionLabel,parent);
        this.init(text,position,id,gameLayer);
    },
    init : function(text,position,id,gameLayer){
        this.answer = new cc.LabelTTF(text,"宋体", 28);
        this.answer.setColor(cc.color(0,0,0,0));
        this.answer.setAnchorPoint(cc.p(0,0));
        this.answer.setPosition(position.x,position.y);
        gameLayer.addChild(this.answer);
        this.setPosition(position.x,position.y);
        this.setContentSize(400,30);
    },
    mouseListener : function(text,position,id,gameLayer,allPersons,currentPersons,questionLabel,parent){
        _this = this;
        cc.eventManager.addListener(cc.EventListener.create({
            event : cc.EventListener.MOUSE,
            onMouseDown : function(event) {
                var pos = event.getLocation(); //当前事件发生的光标位置
                var target = event.getCurrentTarget(); //事件绑定的目标
                //判断当前事件发生的位置是否在事件目标区域内
                if( cc.rectContainsPoint(target.getBoundingBox(), pos) ) {
                    switch(id){
                        case 1:
                            currentPersons.name = allPersons.fugui;
                            questionLabel.setVisible(false);
                            parent.nextQuestion();
                            break;
                        case 2:
                            currentPersons.name = allPersons.pinqiong;
                            questionLabel.setVisible(false);
                            parent.nextQuestion();
                            break;
                        case 3:
                            var newArray = new Array();
                            for(var i =0 ; i< currentPersons.name.length;i++){
                                if(allPersons.jicheng.indexOf(currentPersons.name[i])!=-1){
                                    newArray.push(currentPersons.name[i]);
                                }
                            }
                            currentPersons.name = newArray;
                            questionLabel.setVisible(false);
                            parent.chooseHero();
                            break;
                        case 4:
                            var newArray = new Array();
                            for(var i =0 ; i< currentPersons.name.length;i++){
                                if(allPersons.qiuxue.indexOf(currentPersons.name[i])!=-1){
                                    newArray.push(currentPersons.name[i]);
                                }
                            }
                            currentPersons.name = newArray;
                            questionLabel.setVisible(false);
                            parent.chooseHero();
                            break;
                        case 5:
                            var newArray = new Array();
                            for(var i =0 ; i< currentPersons.name.length;i++){
                                if(allPersons.jianghu.indexOf(currentPersons.name[i])!=-1){
                                    newArray.push(currentPersons.name[i]);
                                }
                            }
                            currentPersons.name = newArray;
                            questionLabel.setVisible(false);
                            parent.chooseHero();
                            break;
                    }
                    return true;
                }
                return false;
            }
        }), this);
    }
});