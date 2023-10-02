// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { LOSE } from "../Helper/constants";
import { vectorsToDegress } from "../Helper/utils";
import Bullet from "./Bullet";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Cannon extends cc.Component {

    @property(cc.SpriteFrame)
    sprFrame: cc.SpriteFrame[] = [];

    @property(cc.Prefab)
    ballPrefab: cc.Prefab = null;

    @property(cc.Node)
    shootPoint: cc.Node = null;

    @property(cc.Node)
    base: cc.Node = null;

    @property(cc.Node)
    gun: cc.Node = null;

    @property(cc.Node)
    bg: cc.Node = null;

    @property(cc.Node)
    baseGame: cc.Node = null;

    posEndX = 0;
    posEndY = 0;
    check = false;

    id = 0;

    start() {
        this.bg.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    }

    update(dt) {
        // this.base.angle += 130 * dt;
        this.gun.angle += 200 * dt;
        if (this.gun.angle >= 360) {
            this.gun.angle = 0;
        }
    }

    onTouchStart(touch) {
        // if (this.check) { return; }
        // this.check = true;
        // let pos = this.node.convertToNodeSpaceAR(touch.getLocation());
        // this.posEndX = pos.x;
        // this.posEndY = pos.y;
        // let angle = vectorsToDegress(this.getAngle());
        // this.gun.angle = -angle + 96;
        // cc.log(this.gun.angle);
        this.onCreateBall();
    }

    getAngle() {
        return cc.v2(this.posEndX, this.posEndY);
    }

    onCreateBall() {
        this.scheduleOnce(() => {
            this.check = false;
        }, 0.4)
        const bullet = cc.instantiate(this.ballPrefab);
        this.node.addChild(bullet);
        let worldPos = this.shootPoint.convertToWorldSpaceAR(cc.Vec2.ZERO)
        let pos = this.node.convertToNodeSpaceAR(worldPos);
        bullet.position = pos;
    }

    onCollisionEnter(other) {
        if (other.tag === 1 || other.tag === 2) {
            other.node.destroy();
            this.id++;
            const act = cc.sequence(
                cc.tintTo(1, 255, 0, 0),
                cc.tintTo(0.4, 255, 255, 255)
            )
            this.base.runAction(act);
            cc.log(this.id);
            if (this.id > 4) {
                other.node.emit(LOSE);
                this.node.destroy();
            }
            this.gun.getComponent(cc.Sprite).spriteFrame = this.sprFrame[this.id];
        }

    }
}
