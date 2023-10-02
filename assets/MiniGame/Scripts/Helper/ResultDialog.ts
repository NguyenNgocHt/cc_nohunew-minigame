// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { getBestTop, getMode, getScore } from "../Data/GameDataManage";



const { ccclass, property } = cc._decorator;

@ccclass
export default class ResultDialog extends cc.Component {

    @property(cc.Label)
    labelScore: cc.Label = null;

    @property(cc.Label)
    labelTop: cc.Label = null;


    show() {
        this.labelTop.string = getBestTop()[getMode()].toString();
        this.labelScore.string = `${getScore()}`
        this.node.scale = 0
        //this.node.active = true
        let act = cc.scaleTo(0.4, 1).easing(cc.easeBounceOut())
        this.node.runAction(act);
    }
}
