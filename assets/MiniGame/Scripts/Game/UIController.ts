// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ResultDialog from "../Helper/ResultDialog";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIControllers extends cc.Component {
    @property(cc.Label)
    labelScore: cc.Label = null;

    @property(cc.Node)
    gameWinDialog: cc.Node = null;

    @property(cc.Node)
    gameLoseDialog: cc.Node = null;

    @property(ResultDialog)
    tabResultWin: ResultDialog = null;

    @property(ResultDialog)
    tabResultLose: ResultDialog = null;

    updateLabelScore(score) {
        this.labelScore.string = `${score}`;
    }

    gameWinEvent() {
        this.gameWinDialog.active = true;
        this.tabResultWin.show();
    }

    gameLoseEvent() {
        this.gameLoseDialog.active = true;
        this.tabResultLose.show();

    }
}
