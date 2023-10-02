import { setMode } from "../Data/GameDataManage";
import Enemy1 from "../Game/Enemy1";
import { getDistance, getRandom } from "../Helper/utils";



const { ccclass, property } = cc._decorator;

@ccclass
export default class ModeControl extends cc.Component {

    @property(cc.Prefab)
    enemy: cc.Prefab = null;

    @property(cc.Node)
    baseGame: cc.Node = null;

    distance = 0;
    posInsect: cc.Vec2 = cc.Vec2.ZERO;
    speedEnemy1 = 250;


    onClickMode(event, data) {
        setMode(parseInt(data))
        cc.director.loadScene('GamePlay')
    }

    onClickHome() {
        cc.director.loadScene('Home')
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
