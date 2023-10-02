// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { getBestTop, getMode, setBestTop, setScore } from "../Data/GameDataManage";
import { LOSE, SCORE } from "../Helper/constants";
import { getDistance, getRandom } from "../Helper/utils";
import Enemy from "./Enemy";
import Enemy1 from "./Enemy1";
import UIControllers from "./UIController";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameController extends cc.Component {

    @property(cc.Prefab)
    enemy: cc.Prefab = null;

    @property(cc.Node)
    baseGame: cc.Node = null;

    @property(cc.Prefab)
    enemy1: cc.Prefab = null;

    @property(cc.Prefab)
    prefabLabel: cc.Prefab = null;

    @property(UIControllers)
    uiController: UIControllers = null;

    distance = 0;
    posInsect: cc.Vec2 = cc.Vec2.ZERO;
    speedEnemy = 200;
    speedEnemy1 = 250;
    time = 2.5;
    score = 0;
    gameOver = false;
    count = 0;

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
    }

    start() {
        setScore(0);
        this.onCreateEnemy();
        if (getMode() === 1) {
            this.scheduleOnce(() => {
                this.onCreateEnemy1();
            }, 3)

        }
    }


    onCreateEnemy() {
        const enemy = cc.instantiate(this.enemy);
        this.baseGame.addChild(enemy);
        let rd = getRandom(0, 2);
        switch (rd) {
            case 0:
                let rd2 = getRandom(0, 1);
                let x = rd2 === 0 ? 800 : -800;
                enemy.position = cc.v2(x, 500);
                break;
            case 1:
                enemy.position = cc.v2(-800, -500);
                break;
            case 2:
                enemy.position = cc.v2(800, -500);
                break;

        }

        this.distance = getDistance(this.posInsect, cc.v2(0, 0)) / 300
        this.posInsect = enemy.position;
        enemy.getComponent(Enemy).speed = this.speedEnemy;
        enemy.getComponent(Enemy).setDir();
        this.scheduleOnce(this.onCreateEnemy.bind(this), this.time)
        this.getSpeed();
        enemy.on(SCORE, () => { this.ChoiceCorrect(enemy.position), this });
        enemy.on(LOSE, this.updateHeartL, this)
    }

    getSpeed() {
        this.count++
        if (this.count >= 12) {
            this.speedEnemy += 50;
            this.speedEnemy1 += 50;
            this.count = 0;
            if (this.time >= 1) {
                this.time -= 0.5;
            }
        }
    }

    onCreateEnemy1() {
        const enemy = cc.instantiate(this.enemy1);
        this.baseGame.addChild(enemy);
        let rd = getRandom(0, 1);
        let rd1 = getRandom(0, 3);
        enemy.getComponent(Enemy1).radom(rd1);
        switch (rd) {
            case 0:
                enemy.position = cc.v2(800, 0);
                break;
            case 1:
                enemy.position = cc.v2(-800, 0);
                break;
            // case 2:
            //     enemy.position = cc.v2(-1, -500);
            //     break;
        }

        this.distance = getDistance(this.posInsect, cc.v2(0, 0)) / 300
        this.posInsect = enemy.position;
        enemy.getComponent(Enemy1).speed = this.speedEnemy1;
        enemy.getComponent(Enemy1).setDir();
        this.scheduleOnce(this.onCreateEnemy1.bind(this), this.time)
        enemy.on(SCORE, () => { this.ChoiceCorrect(enemy.position), this });
        enemy.on(LOSE, this.updateHeartL, this);
        this.getSpeed();
    }

    ChoiceCorrect(pos: cc.Vec2) {
        this.score += 100;
        setScore(this.score);
        this.uiController.updateLabelScore(this.score);
        this.onCreateLabel(1, pos);
    }

    onCreateLabel(id, pos) {
        const lb = cc.instantiate(this.prefabLabel)
        this.baseGame.addChild(lb);
        lb.position = pos;
        if (id === 1) {
            lb.color = cc.color(255, 255, 255, 255)
            lb.getComponent(cc.Label).string = `+100`;
        }
        let act = cc.moveBy(0.5, cc.v2(0, 140))
        lb.runAction(cc.sequence(act, cc.callFunc(() => {
            lb.destroy()
        })))
    }

    gameDone() {
        this.unscheduleAllCallbacks();
        let dataTop = getBestTop()
        if (dataTop[getMode()] < this.score) {
            dataTop[getMode()] = this.score
            setBestTop(dataTop);
        }
    }

    updateHeartL() {
        if (this.gameOver) { return; }
        let dataTop = getBestTop()
        this.gameDone();
        this.scheduleOnce(() => {
            cc.log('aa');
            if (this.score >= dataTop[getMode()]) {
                this.uiController.gameWinEvent()
            } else {
                this.uiController.gameLoseEvent()
            }
        }, 0.2)
        this.scheduleOnce(() => {
            cc.director.pause();
        }, 0.6)
        this.gameOver = true;
    }

    onClickHome() {
        cc.director.resume();
        cc.director.loadScene('Home');
    }

    onClickRestart() {
        cc.director.resume();
        cc.director.loadScene('GamePlay');
    } s

}
