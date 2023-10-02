// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Enemy from "../Game/Enemy";
import Enemy1 from "../Game/Enemy1";
import { getDistance, getRandom } from "../Helper/utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Home extends cc.Component {

    @property(cc.Node)
    tabHelp: cc.Node = null;

    @property(cc.Prefab)
    enemy: cc.Prefab = null;

    @property(cc.Node)
    baseGame: cc.Node = null;

    distance = 0;
    posInsect: cc.Vec2 = cc.Vec2.ZERO;
    speedEnemy1 = 250;

    onHelp() {
        this.tabHelp.active = true;
    }

    offHelp() {
        this.tabHelp.active = false;
    }

    onPlay() {
        cc.director.loadScene('Level');
    }

    start() {
        this.onCreateEnemy();
        this.schedule(this.onCreateEnemy, 2);
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
        enemy.getComponent(Enemy1).speed = this.speedEnemy1;
        enemy.getComponent(Enemy1).setDir();
    }
}
